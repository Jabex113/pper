import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  VStack,
  HStack,
  Text,
  useColorModeValue,
  Heading,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/react';
import { FaLink, FaDownload } from 'react-icons/fa';

export default function DownloadForm({
  url,
  setUrl,
  platform,
  setPlatform,
  onDownload,
  isLoading,
  platforms,
}) {
  return (
    <Box
      id="download"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow="xl"
      p={8}
      scrollMarginTop="80px"
    >
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading size="md" mb={4}>
            Download Your Video
          </Heading>
          <Text color="gray.500">
            Paste a video URL from TikTok, YouTube, Facebook, or other supported platforms.
          </Text>
        </Box>

        <FormControl isRequired>
          <FormLabel htmlFor="url">Video URL</FormLabel>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <Icon as={FaLink} color="gray.400" />
            </InputLeftElement>
            <Input
              id="url"
              placeholder="Paste video URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              focusBorderColor="brand.400"
              size="lg"
            />
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="platform">Platform (Optional)</FormLabel>
          <Select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            size="lg"
            focusBorderColor="brand.400"
          >
            <option value="auto">Auto Detect</option>
            {platforms.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button
          colorScheme="brand"
          isLoading={isLoading}
          loadingText="Downloading..."
          onClick={onDownload}
          size="lg"
          leftIcon={<FaDownload />}
          mt={4}
        >
          Download Now
        </Button>

        <Text fontSize="sm" color="gray.500" textAlign="center">
          By using our service, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </VStack>
    </Box>
  );
} 