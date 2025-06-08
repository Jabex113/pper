from app import app
import os

# Create a test HTML file to verify serving works
def create_test_files():
    # Check if we're in the backend directory
    if os.path.exists('app.py'):
        dist_path = 'dist'
    else:
        dist_path = os.path.join('backend', 'dist')
    
    # Create dist directory if it doesn't exist
    if not os.path.exists(dist_path):
        os.makedirs(dist_path)
    
    # Create a test HTML file
    with open(os.path.join(dist_path, 'test.html'), 'w') as f:
        f.write('<html><body><h1>Test Page</h1><p>If you see this, Flask is serving static files correctly.</p></body></html>')
    
    # Create an index.html file
    with open(os.path.join(dist_path, 'index.html'), 'w') as f:
        f.write('<html><body><h1>VidDown</h1><p>Welcome to VidDown!</p><p><a href="/test.html">Test Page</a></p></body></html>')
    
    print(f"Test files created in {os.path.abspath(dist_path)}")

if __name__ == "__main__":
    create_test_files()
    app.run(debug=True, port=5001) 