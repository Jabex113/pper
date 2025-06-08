import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  HStack,
  Input,
  Button,
  Select,
  useToast,
  Flex,
  Image,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  IconButton
} from '@chakra-ui/react';
import { FaDownload, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';
import { BiCopy } from 'react-icons/bi';
import axios from 'axios';
import Header from './components/Header';
import Hero from './components/Hero';
import PlatformCard from './components/PlatformCard';
import DownloadForm from './components/DownloadForm';

function App() {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('auto');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadResult, setDownloadResult] = useState(null);
  const [platforms, setPlatforms] = useState([]);
  const toast = useToast();

  useEffect(() => {
    // Fetch supported platforms
    axios.get('/api/platforms')
      .then(response => {
        setPlatforms(response.data);
      })
      .catch(error => {
        console.error('Error fetching platforms:', error);
      });
  }, []);

  const handleDownload = async () => {
    if (!url) {
      toast({
        title: 'URL Required',
        description: 'Please enter a valid video URL.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    setDownloadResult(null);

    try {
      const response = await axios.post('/api/download', {
        url,
        platform
      });

      if (response.data.success) {
      setDownloadResult(response.data);
      toast({
        title: 'Download Successful',
        description: 'Your video has been downloaded successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      } else {
        // Handle case where API returns success: false
        toast({
          title: 'Download Issue',
          description: response.data.error || 'Download completed with issues.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Download error:', error);
      
      // Get detailed error message
      const errorMessage = error.response?.data?.error || 'An error occurred during download.';
      const errorDetails = error.response?.data?.details || '';
      
      toast({
        title: 'Download Failed',
        description: errorMessage,
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
      
      if (errorDetails) {
        console.error('Error details:', errorDetails);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minH="100vh">
      <Header />
      <Hero />
      
      <Container maxW="container.xl" py={10}>
        <VStack spacing={10} align="stretch">
          {/* Platform Selection */}
          <Box>
            <Heading size="xl" mb={6} textAlign="center">
              Supported Platforms
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              {platforms.map(plat => (
                <PlatformCard 
                  key={plat.id}
                  platform={plat}
                  onClick={() => setPlatform(plat.id)}
                  isSelected={platform === plat.id}
                />
              ))}
            </SimpleGrid>
          </Box>

          {/* Download Form */}
          <DownloadForm 
            url={url}
            setUrl={setUrl}
            platform={platform}
            setPlatform={setPlatform}
            onDownload={handleDownload}
            isLoading={isLoading}
            platforms={platforms}
          />

          {/* Download Results */}
          {downloadResult && (
            <Box 
              borderWidth="1px" 
              borderRadius="lg" 
              p={6} 
              bg="white"
              shadow="md"
            >
              <Heading size="md" mb={4}>Download Completed</Heading>
              <Text mb={2}>
                <strong>Filename:</strong> {downloadResult.filename}
              </Text>
              <HStack>
                <Button 
                  colorScheme="brand" 
                  leftIcon={<FaDownload />}
                  as="a"
                  href={`/api/downloads/${downloadResult.filename}`}
                  download
                >
                  Download Now
                </Button>
                <IconButton
                  icon={<BiCopy />}
                  aria-label="Copy download link"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/api/downloads/${downloadResult.filename}`);
                    toast({
                      title: 'Link Copied',
                      status: 'info',
                      duration: 2000,
                    });
                  }}
                />
              </HStack>
            </Box>
          )}
        </VStack>
      </Container>

      {/* Footer */}
      <Box bg="gray.50" py={10} mt={10}>
        <Container maxW="container.xl">
          <VStack>
            <Text>© {new Date().getFullYear()} VidDown - Video Downloader. All rights reserved.</Text>
            <Text fontSize="sm" color="gray.500">
              This tool is for personal use only. Please respect copyright laws.
            </Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}

export default App; 