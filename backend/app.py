from flask import Flask, request, jsonify, send_from_directory, redirect
from flask_cors import CORS
import os
import requests
import yt_dlp as youtube_dl
import re

# Set up Flask app to serve both API and frontend
frontend_build_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'dist'))
app = Flask(__name__, static_folder=frontend_build_dir)
CORS(app, resources={r"/*": {"origins": "*"}})

# API Routes

# Simple route to test if API is working
@app.route('/api/health')
def health_check():
    return jsonify({"status": "healthy"})

@app.route('/api')
def api_index():
    return jsonify({"message": "VidDown API is running"})

@app.route('/api/download', methods=['POST'])
def download_video():
    data = request.get_json()
    url = data.get('url', '')
    platform = data.get('platform', 'auto')
    
    if not url:
        return jsonify({'error': 'URL is required'}), 400
    
    print(f"Received download request for URL: {url}, platform: {platform}")
    
    try:
        if platform == 'tiktok':
            return download_tiktok(url)
        elif platform == 'youtube':
            return download_youtube(url)
        elif platform == 'facebook':
            return download_facebook(url)
        elif platform == 'phub':
            return download_phub(url)
        else:
            # Auto-detect platform
            if 'tiktok.com' in url:
                print(f"Auto-detected platform: TikTok")
                return download_tiktok(url)
            elif 'youtube.com' in url or 'youtu.be' in url:
                print(f"Auto-detected platform: YouTube")
                return download_youtube(url)
            elif 'facebook.com' in url or 'fb.com' in url:
                print(f"Auto-detected platform: Facebook")
                return download_facebook(url)
            elif 'pornhub.com' in url:
                print(f"Auto-detected platform: Adult Content more")
                return download_phub(url)
            else:
                print(f"Unsupported platform for URL: {url}")
                # Try generic download as fallback
                print(f"Attempting generic download")
                return download_generic(url)
    
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Error downloading video: {str(e)}")
        print(error_details)
        return jsonify({'error': str(e), 'details': error_details}), 500

def download_tiktok(url):
    # Create a unique filename based on timestamp to avoid truncation issues
    import time
    timestamp = int(time.time())
    
    # First, let's check what formats are available
    print("Checking available formats for TikTok video...")
    try:
        with youtube_dl.YoutubeDL({'listformats': True}) as ydl:
            info = ydl.extract_info(url, download=False)
            if info and 'formats' in info:
                print("Available formats:")
                for fmt in info['formats']:
                    height = fmt.get('height', 'N/A')
                    width = fmt.get('width', 'N/A')
                    format_id = fmt.get('format_id', 'N/A')
                    ext = fmt.get('ext', 'N/A')
                    filesize = fmt.get('filesize', 'N/A')
                    print(f"  Format {format_id}: {width}x{height} ({ext}) - Size: {filesize}")
    except Exception as e:
        print(f"Could not list formats: {e}")
    
    ydl_opts = {
        # Ultra-aggressive quality selection - get the absolute highest quality available
        'format': 'bestvideo[height<=4320]+bestaudio/bestvideo[height<=2160]+bestaudio/bestvideo[height<=1440]+bestaudio/bestvideo[height<=1080]+bestaudio/bestvideo+bestaudio/best[height<=4320]/best[height<=2160]/best[height<=1440]/best[height<=1080]/best',
        'outtmpl': f'downloads/tiktok_{timestamp}.%(ext)s',  # Use timestamp in filename
        'noplaylist': True,
        'verbose': True,
        'geo_bypass': True,
        'nocheckcertificate': True,
        'ignoreerrors': False,
        'logtostderr': False,
        'quiet': False,
        'no_warnings': False,
        'default_search': 'auto',
        'source_address': '0.0.0.0',
        'writeinfojson': True,  # Write video info to JSON file for debugging
        'prefer_ffmpeg': True,  # Prefer ffmpeg for merging if available
        'merge_output_format': 'mp4',  # Ensure output is mp4
        'postprocessors': [{
            'key': 'FFmpegVideoConvertor',
            'preferedformat': 'mp4',
        }],
    }
    
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        filename = ydl.prepare_filename(info)
        
        # Log video quality information
        if info:
            height = info.get('height', 'Unknown')
            width = info.get('width', 'Unknown')
            format_id = info.get('format_id', 'Unknown')
            ext = info.get('ext', 'Unknown')
            filesize = info.get('filesize', 'Unknown')
            print(f"Downloaded TikTok video - Resolution: {width}x{height}, Format: {format_id}, Extension: {ext}, Size: {filesize}")
        
        # Verify the file exists
        if os.path.exists(filename):
            print(f"File successfully downloaded to: {filename}")
            return jsonify({
                'success': True,
                'filename': os.path.basename(filename),
                'path': filename,
                'quality': f"{width}x{height}" if info else "Unknown"
            })
        else:
            print(f"File not found at expected path: {filename}")
            return jsonify({
                'error': 'File was not downloaded correctly'
            }), 500

def download_youtube(url):
    # Create a unique filename based on timestamp to avoid truncation issues
    import time
    timestamp = int(time.time())
    
    ydl_opts = {
        # Ultra-aggressive quality selection - get the absolute highest quality available including 8K
        'format': 'bestvideo[height<=4320]+bestaudio/bestvideo[height<=2160]+bestaudio/bestvideo[height<=1440]+bestaudio/bestvideo[height<=1080]+bestaudio/bestvideo+bestaudio/best[height<=4320]/best[height<=2160]/best[height<=1440]/best[height<=1080]/best',
        'outtmpl': f'downloads/youtube_{timestamp}.%(ext)s',  # Use timestamp in filename
        'noplaylist': True,
        'verbose': True,
        'geo_bypass': True,
        'nocheckcertificate': True,
        'ignoreerrors': False,
        'logtostderr': False,
        'quiet': False,
        'no_warnings': False,
        'default_search': 'auto',
        'source_address': '0.0.0.0',
        'writeinfojson': True,  # Write video info to JSON file for debugging
        'prefer_ffmpeg': True,  # Prefer ffmpeg for merging if available
        'merge_output_format': 'mp4',  # Ensure output is mp4
        'postprocessors': [{
            'key': 'FFmpegVideoConvertor',
            'preferedformat': 'mp4',
        }],
    }
    
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        filename = ydl.prepare_filename(info)
        
        # Log video quality information
        if info:
            height = info.get('height', 'Unknown')
            width = info.get('width', 'Unknown')
            format_id = info.get('format_id', 'Unknown')
            ext = info.get('ext', 'Unknown')
            filesize = info.get('filesize', 'Unknown')
            print(f"Downloaded YouTube video - Resolution: {width}x{height}, Format: {format_id}, Extension: {ext}, Size: {filesize}")
        
        # Verify the file exists
        if os.path.exists(filename):
            print(f"File successfully downloaded to: {filename}")
            return jsonify({
                'success': True,
                'filename': os.path.basename(filename),
                'path': filename,
                'quality': f"{width}x{height}" if info else "Unknown"
            })
        else:
            print(f"File not found at expected path: {filename}")
            return jsonify({
                'error': 'File was not downloaded correctly'
            }), 500

def download_facebook(url):
    # Create a unique filename based on timestamp to avoid truncation issues
    import time
    timestamp = int(time.time())
    
    ydl_opts = {
        # Ultra-aggressive quality selection - get the absolute highest quality available
        'format': 'bestvideo[height<=4320]+bestaudio/bestvideo[height<=2160]+bestaudio/bestvideo[height<=1440]+bestaudio/bestvideo[height<=1080]+bestaudio/bestvideo+bestaudio/best[height<=4320]/best[height<=2160]/best[height<=1440]/best[height<=1080]/best',
        'outtmpl': f'downloads/facebook_{timestamp}.%(ext)s',  # Use timestamp in filename
        'noplaylist': True,
        'verbose': True,
        'geo_bypass': True,
        'nocheckcertificate': True,
        'ignoreerrors': False,
        'logtostderr': False,
        'quiet': False,
        'no_warnings': False,
        'default_search': 'auto',
        'source_address': '0.0.0.0',
        'writeinfojson': True,  # Write video info to JSON file for debugging
        'prefer_ffmpeg': True,  # Prefer ffmpeg for merging if available
        'merge_output_format': 'mp4',  # Ensure output is mp4
        'postprocessors': [{
            'key': 'FFmpegVideoConvertor',
            'preferedformat': 'mp4',
        }],
    }
    
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        filename = ydl.prepare_filename(info)
        
        # Verify the file exists
        if os.path.exists(filename):
            print(f"File successfully downloaded to: {filename}")
            return jsonify({
                'success': True,
                'filename': os.path.basename(filename),
                'path': filename
            })
        else:
            print(f"File not found at expected path: {filename}")
            return jsonify({
                'error': 'File was not downloaded correctly'
            }), 500

def download_phub(url):
    # Create a unique filename based on timestamp to avoid truncation issues
    import time
    timestamp = int(time.time())
    
    ydl_opts = {
        # Ultra-aggressive quality selection - get the absolute highest quality available
        'format': 'bestvideo[height<=4320]+bestaudio/bestvideo[height<=2160]+bestaudio/bestvideo[height<=1440]+bestaudio/bestvideo[height<=1080]+bestaudio/bestvideo+bestaudio/best[height<=4320]/best[height<=2160]/best[height<=1440]/best[height<=1080]/best',
        'outtmpl': f'downloads/adult_{timestamp}.%(ext)s',  # Use timestamp in filename
        'noplaylist': True,
        'verbose': True,
        'geo_bypass': True,
        'nocheckcertificate': True,
        'ignoreerrors': False,
        'logtostderr': False,
        'quiet': False,
        'no_warnings': False,
        'default_search': 'auto',
        'source_address': '0.0.0.0',
        'writeinfojson': True,  # Write video info to JSON file for debugging
        'prefer_ffmpeg': True,  # Prefer ffmpeg for merging if available
        'merge_output_format': 'mp4',  # Ensure output is mp4
        'postprocessors': [{
            'key': 'FFmpegVideoConvertor',
            'preferedformat': 'mp4',
        }],
    }
    
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        filename = ydl.prepare_filename(info)
        
        # Verify the file exists
        if os.path.exists(filename):
            print(f"File successfully downloaded to: {filename}")
            return jsonify({
                'success': True,
                'filename': os.path.basename(filename),
                'path': filename
            })
        else:
            print(f"File not found at expected path: {filename}")
            return jsonify({
                'error': 'File was not downloaded correctly'
            }), 500

@app.route('/api/platforms', methods=['GET'])
def get_platforms():
    platforms = [
        {"id": "tiktok", "name": "TikTok"},
        {"id": "youtube", "name": "YouTube"},
        {"id": "facebook", "name": "Facebook"},
        {"id": "phub", "name": "Pornhub and more"}
    ]
    return jsonify(platforms)

def download_generic(url):
    """Generic download function as a fallback for unsupported platforms"""
    print(f"Attempting generic download for URL: {url}")
    
    # Create a unique filename based on timestamp to avoid truncation issues
    import time
    timestamp = int(time.time())
    
    ydl_opts = {
        # Ultra-aggressive quality selection - get the absolute highest quality available
        'format': 'bestvideo[height<=4320]+bestaudio/bestvideo[height<=2160]+bestaudio/bestvideo[height<=1440]+bestaudio/bestvideo[height<=1080]+bestaudio/bestvideo+bestaudio/best[height<=4320]/best[height<=2160]/best[height<=1440]/best[height<=1080]/best',
        'outtmpl': f'downloads/video_{timestamp}.%(ext)s',  # Use timestamp in filename
        'noplaylist': True,
        'verbose': True,
        'geo_bypass': True,
        'nocheckcertificate': True,
        'ignoreerrors': False,
        'logtostderr': False,
        'quiet': False,
        'no_warnings': False,
        'default_search': 'auto',
        'source_address': '0.0.0.0',
        'extract_flat': False,
        'writeinfojson': True,  # Write video info to JSON file for debugging
        'prefer_ffmpeg': True,  # Prefer ffmpeg for merging if available
        'merge_output_format': 'mp4',  # Ensure output is mp4
        'postprocessors': [{
            'key': 'FFmpegVideoConvertor',
            'preferedformat': 'mp4',
        }],
    }
    
    try:
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            if info is None:
                return jsonify({'error': 'Could not extract video information'}), 400
                
            filename = ydl.prepare_filename(info)
            
            # Verify the file exists
            if os.path.exists(filename):
                print(f"File successfully downloaded to: {filename}")
                return jsonify({
                    'success': True,
                    'filename': os.path.basename(filename),
                    'path': filename
                })
            else:
                print(f"File not found at expected path: {filename}")
                return jsonify({
                    'error': 'File was not downloaded correctly'
                }), 500
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Generic download failed: {str(e)}")
        print(error_details)
        return jsonify({'error': f"Download failed: {str(e)}"}), 500

@app.route('/api/downloads/<path:filename>')
def download_file(filename):
    print(f"Requested file download: {filename}")
    
    # Create the downloads directory if it doesn't exist
    download_dir = 'downloads'
    if not os.path.exists(download_dir):
        os.makedirs(download_dir)
    
    # List all files in the downloads directory
    all_files = os.listdir(download_dir)
    print(f"All files in downloads directory: {all_files}")
    
    # Check if the exact filename exists
    if os.path.exists(os.path.join(download_dir, filename)):
        print(f"File found: {filename}")
        return send_from_directory(download_dir, filename)
    else:
        print(f"File not found: {filename}")
        return jsonify({'error': 'File not found'}), 404

@app.route('/api/download-source')
def download_source_code():
    """Endpoint to redirect users to the GitHub repository"""
    # Redirect to the GitHub repository
    github_repo_url = "https://github.com/Jabex113/pper"
    print(f"Redirecting to GitHub repository: {github_repo_url}")
    return redirect(github_repo_url)

# Serve frontend routes
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    # First, try to serve the requested path as a static file
    if path and os.path.exists(os.path.join(frontend_build_dir, path)):
        return send_from_directory(frontend_build_dir, path)
    
    # Otherwise, serve index.html for client-side routing
    return send_from_directory(frontend_build_dir, 'index.html')

if __name__ == '__main__':
    # Create downloads directory if it doesn't exist
    if not os.path.exists('downloads'):
        os.makedirs('downloads')
    
    # Get port from environment variable or use 5001 as default
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', debug=True, port=port) 