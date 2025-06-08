import React from 'react';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { FaDownload, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';

export default function Hero() {
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW={'container.xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
          position="relative"
        >
          <Box zIndex={1}>
            <Heading
              fontWeight={700}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
              lineHeight={'120%'}
              mb={4}
            >
              Download Videos from <br />
              <Text as={'span'} color={'brand.400'}>
                Any Platform
              </Text>
            </Heading>
            <Text color={'gray.500'} maxW={'3xl'} mx={'auto'} fontSize={{ base: 'lg', md: 'xl' }}>
              Download high-quality videos from TikTok, YouTube, Facebook, and more without watermarks. 
              Our tool ensures you get the best quality and fastest downloads possible.
            </Text>
          </Box>

          <Flex justify="center" align="center" flexWrap="wrap" gap={4} zIndex={1}>
            <Icon as={FaTiktok} w={12} h={12} color="gray.400" />
            <Icon as={FaYoutube} w={16} h={16} color="gray.400" />
            <Icon as={FaFacebook} w={12} h={12} color="gray.400" />
            <Box fontSize="4xl" color="gray.400">+</Box>
          </Flex>

          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
            zIndex={1}
          >
            <Button
              colorScheme={'brand'}
              bg={'brand.400'}
              rounded={'full'}
              px={6}
              py={7}
              fontWeight={'bold'}
              fontSize={'lg'}
              _hover={{
                bg: 'brand.500',
              }}
              leftIcon={<FaDownload />}
              as={'a'}
              href={'#download'}
            >
              Start Downloading Now
            </Button>
            <Text fontSize={'sm'} color={'gray.500'}>
              100% Free. No registration required.
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
} 