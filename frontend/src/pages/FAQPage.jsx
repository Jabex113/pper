import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Link,
  Icon,
  VStack,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  useColorModeValue,
  Badge,
  Divider,
  SimpleGrid,
  Card,
  CardBody
} from '@chakra-ui/react';
import { FaDownload, FaGlobe, FaComments, FaHeadset, FaChevronDown, FaQuestionCircle, FaLightbulb, FaShieldAlt, FaCode } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import Header from '../components/Header';

const FAQPage = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const activeBg = useColorModeValue('blue.50', 'blue.900');
  const sidebarBg = useColorModeValue('gray.50', 'gray.800');
  const mainBg = useColorModeValue('white', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');
  const accordionBg = useColorModeValue('gray.50', 'gray.700');
  const hoverBg = useColorModeValue('blue.50', 'blue.900');
  
  return (
    <Box>
      <Header />
      
      {/* Main Content */}
      <Container maxW="container.xl" p={0}>
        <Flex>
          {/* Sidebar */}
          <Box w="250px" bg={sidebarBg} minH="calc(100vh - 120px)" display={{ base: 'none', lg: 'block' }} py={4}>
            <VStack align="stretch" spacing={0}>
              <Link 
                as={RouterLink} 
                to="/" 
                py={2} 
                px={4} 
                _hover={{ bg: activeBg }}
                display="flex"
                alignItems="center"
              >
                <Icon as={FaGlobe} mr={3} />
                <Text fontWeight="medium">Website</Text>
              </Link>
              
              <Link 
                py={2} 
                px={4} 
                _hover={{ bg: activeBg }}
                display="flex"
                alignItems="center"
              >
                <Icon as={FaComments} mr={3} />
                <Text fontWeight="medium">Forum</Text>
              </Link>
              
              <Link 
                py={2} 
                px={4} 
                _hover={{ bg: activeBg }}
                display="flex"
                alignItems="center"
              >
                <Icon as={FaHeadset} mr={3} />
                <Text fontWeight="medium">Support</Text>
              </Link>
              
              <Box py={4}>
                <Text fontWeight="bold" px={4} mb={2}>
                  Get Started
                </Text>
                <VStack align="stretch" spacing={0}>
                  <Link 
                    as={RouterLink} 
                    to="/" 
                    py={2} 
                    px={8} 
                    _hover={{ bg: activeBg }}
                  >
                    Welcome to VidDown
                  </Link>
                  <Link 
                    as={RouterLink} 
                    to="/" 
                    py={2} 
                    px={8} 
                    _hover={{ bg: activeBg }}
                  >
                    Installation
                  </Link>
                  <Link 
                    py={2} 
                    px={8} 
                    bg={activeBg} 
                    fontWeight="semibold"
                  >
                    FAQ
                  </Link>
                </VStack>
              </Box>
            </VStack>
          </Box>
          
          {/* Main Content */}
          <Box flex="1" p={{ base: 4, md: 8 }} bg={mainBg}>
            {/* Header Section */}
            <Box mb={8}>
              <HStack mb={4}>
                <Icon as={FaQuestionCircle} color="blue.500" boxSize={6} />
                <Text color="blue.500" fontWeight="semibold" fontSize="sm" textTransform="uppercase" letterSpacing="wide">
                  Get Started
                </Text>
              </HStack>
              <Heading as="h1" size="2xl" mb={4} bgGradient="linear(to-r, blue.400, purple.500)" bgClip="text">
                Frequently Asked Questions
              </Heading>
              <Text fontSize="xl" color="gray.600" maxW="container.md" lineHeight="tall">
                Everything you need to know about VidDown's features, supported platforms, and troubleshooting help
              </Text>
            </Box>

            {/* Quick Stats */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
              <Card bg={cardBg} shadow="md" borderRadius="xl">
                <CardBody textAlign="center" py={6}>
                  <Icon as={FaGlobe} boxSize={8} color="blue.500" mb={3} />
                  <Heading size="md" mb={2}>4+ Platforms</Heading>
                  <Text color="gray.600" fontSize="sm">Supported video platforms</Text>
                </CardBody>
              </Card>
              <Card bg={cardBg} shadow="md" borderRadius="xl">
                <CardBody textAlign="center" py={6}>
                  <Icon as={FaLightbulb} boxSize={8} color="green.500" mb={3} />
                  <Heading size="md" mb={2}>8K Quality</Heading>
                  <Text color="gray.600" fontSize="sm">Maximum video resolution</Text>
                </CardBody>
              </Card>
              <Card bg={cardBg} shadow="md" borderRadius="xl">
                <CardBody textAlign="center" py={6}>
                  <Icon as={FaCode} boxSize={8} color="purple.500" mb={3} />
                  <Heading size="md" mb={2}>Open Source</Heading>
                  <Text color="gray.600" fontSize="sm">Free and customizable</Text>
                </CardBody>
              </Card>
            </SimpleGrid>
            
            {/* FAQ Section */}
            <Box maxW="container.md">
              <Heading size="lg" mb={6} color="gray.700">
                Common Questions
              </Heading>
              <Accordion allowToggle spacing={4}>
                <AccordionItem 
                  border="1px" 
                  borderColor={borderColor} 
                  borderRadius="xl" 
                  bg={cardBg}
                  shadow="sm"
                  mb={4}
                >
                  <h2>
                    <AccordionButton 
                      py={6} 
                      px={6}
                      _hover={{ bg: hoverBg }}
                      _focus={{ boxShadow: 'none' }}
                      borderRadius="xl"
                    >
                      <HStack flex="1" textAlign="left">
                        <Icon as={FaGlobe} color="blue.500" />
                        <Text fontWeight="semibold" fontSize="lg">
                          What platforms does VidDown support?
                        </Text>
                      </HStack>
                      <AccordionIcon color="blue.500" />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={6} px={6} pt={0}>
                    <Divider mb={4} />
                    <Text mb={4} color="gray.600" lineHeight="tall">
                      VidDown supports downloading videos from multiple platforms including:
                    </Text>
                    <VStack align="start" spacing={2} mb={4}>
                      <HStack>
                        <Badge colorScheme="blue" variant="subtle">TikTok</Badge>
                        <Text fontSize="sm" color="gray.600">Short-form videos</Text>
                      </HStack>
                      <HStack>
                        <Badge colorScheme="red" variant="subtle">YouTube</Badge>
                        <Text fontSize="sm" color="gray.600">Up to 8K quality</Text>
                      </HStack>
                      <HStack>
                        <Badge colorScheme="blue" variant="subtle">Facebook</Badge>
                        <Text fontSize="sm" color="gray.600">Social media videos</Text>
                      </HStack>
                      <HStack>
                        <Badge colorScheme="purple" variant="subtle">Adult Contents</Badge>
                        <Text fontSize="sm" color="gray.600">Various adult platforms</Text>
                      </HStack>
                      <HStack>
                        <Badge colorScheme="gray" variant="subtle">Generic</Badge>
                        <Text fontSize="sm" color="gray.600">Many other video platforms</Text>
                      </HStack>
                    </VStack>
                    <Text color="gray.600" fontSize="sm" fontStyle="italic">
                      💡 If a specific platform isn't listed, our system will attempt to use the generic downloader automatically.
                    </Text>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem 
                  border="1px" 
                  borderColor={borderColor} 
                  borderRadius="xl" 
                  bg={cardBg}
                  shadow="sm"
                  mb={4}
                >
                  <h2>
                    <AccordionButton 
                      py={6} 
                      px={6}
                      _hover={{ bg: hoverBg }}
                      _focus={{ boxShadow: 'none' }}
                      borderRadius="xl"
                    >
                      <HStack flex="1" textAlign="left">
                        <Icon as={FaCode} color="purple.500" />
                        <Text fontWeight="semibold" fontSize="lg">
                          What technology does VidDown use for downloading?
                        </Text>
                      </HStack>
                      <AccordionIcon color="purple.500" />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={6} px={6} pt={0}>
                    <Divider mb={4} />
                    <Text color="gray.600" lineHeight="tall">
                      VidDown uses <Badge colorScheme="purple" variant="solid">yt-dlp</Badge>, a powerful and actively maintained fork of youtube-dl, for downloading videos. This library provides excellent support for a wide range of websites and is regularly updated to handle changes in video platforms' structures.
                    </Text>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem 
                  border="1px" 
                  borderColor={borderColor} 
                  borderRadius="xl" 
                  bg={cardBg}
                  shadow="sm"
                  mb={4}
                >
                  <h2>
                    <AccordionButton 
                      py={6} 
                      px={6}
                      _hover={{ bg: hoverBg }}
                      _focus={{ boxShadow: 'none' }}
                      borderRadius="xl"
                    >
                      <HStack flex="1" textAlign="left">
                        <Icon as={FaLightbulb} color="green.500" />
                        <Text fontWeight="semibold" fontSize="lg">
                          What video quality will I get?
                        </Text>
                      </HStack>
                      <AccordionIcon color="green.500" />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={6} px={6} pt={0}>
                    <Divider mb={4} />
                    <Text color="gray.600" lineHeight="tall" mb={4}>
                      Our system attempts to download the highest quality version available, up to <Badge colorScheme="green" variant="solid">8K (4320p)</Badge> resolution where supported.
                    </Text>
                    <VStack align="start" spacing={2} mb={4}>
                      <HStack>
                        <Badge colorScheme="green">🎯</Badge>
                        <Text fontSize="sm" color="gray.600">Ultra-aggressive quality selection process</Text>
                      </HStack>
                      <HStack>
                        <Badge colorScheme="blue">🔄</Badge>
                        <Text fontSize="sm" color="gray.600">Multiple format combinations tested</Text>
                      </HStack>
                      <HStack>
                        <Badge colorScheme="purple">📱</Badge>
                        <Text fontSize="sm" color="gray.600">MP4 format for maximum compatibility</Text>
                      </HStack>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem 
                  border="1px" 
                  borderColor={borderColor} 
                  borderRadius="xl" 
                  bg={cardBg}
                  shadow="sm"
                  mb={4}
                >
                  <h2>
                    <AccordionButton 
                      py={6} 
                      px={6}
                      _hover={{ bg: hoverBg }}
                      _focus={{ boxShadow: 'none' }}
                      borderRadius="xl"
                    >
                      <HStack flex="1" textAlign="left">
                        <Icon as={FaQuestionCircle} color="orange.500" />
                        <Text fontWeight="semibold" fontSize="lg">
                          How does the platform detection work?
                        </Text>
                      </HStack>
                      <AccordionIcon color="orange.500" />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={6} px={6} pt={0}>
                    <Divider mb={4} />
                    <Text color="gray.600" lineHeight="tall" mb={4}>
                      Our application detects the platform by analyzing the URL. It looks for domain-specific patterns such as:
                    </Text>
                    <VStack align="start" spacing={2} mb={4}>
                      <HStack>
                        <Badge colorScheme="red">🔍</Badge>
                        <Text fontSize="sm" color="gray.600">'youtube.com' → YouTube downloader</Text>
                      </HStack>
                      <HStack>
                        <Badge colorScheme="blue">🔍</Badge>
                        <Text fontSize="sm" color="gray.600">'tiktok.com' → TikTok downloader</Text>
                      </HStack>
                      <HStack>
                        <Badge colorScheme="blue">🔍</Badge>
                        <Text fontSize="sm" color="gray.600">'facebook.com' → Facebook downloader</Text>
                      </HStack>
                      <HStack>
                        <Badge colorScheme="gray">🔍</Badge>
                        <Text fontSize="sm" color="gray.600">Unknown → Generic downloader</Text>
                      </HStack>
                    </VStack>
                    <Text color="gray.600" fontSize="sm" fontStyle="italic">
                      💡 Each platform uses optimized settings for the best download experience.
                    </Text>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem 
                  border="1px" 
                  borderColor={borderColor} 
                  borderRadius="xl" 
                  bg={cardBg}
                  shadow="sm"
                  mb={4}
                >
                  <h2>
                    <AccordionButton 
                      py={6} 
                      px={6}
                      _hover={{ bg: hoverBg }}
                      _focus={{ boxShadow: 'none' }}
                      borderRadius="xl"
                    >
                      <HStack flex="1" textAlign="left">
                        <Icon as={FaHeadset} color="red.500" />
                        <Text fontWeight="semibold" fontSize="lg">
                          Why are some videos not downloading?
                        </Text>
                      </HStack>
                      <AccordionIcon color="red.500" />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={6} px={6} pt={0}>
                    <Divider mb={4} />
                    <Text color="gray.600" lineHeight="tall" mb={4}>
                      There could be several reasons why a video might not download:
                    </Text>
                    <VStack align="start" spacing={3} mb={4}>
                      <HStack align="start">
                        <Badge colorScheme="red">🔒</Badge>
                        <Text fontSize="sm" color="gray.600">DRM protection or anti-download mechanisms</Text>
                      </HStack>
                      <HStack align="start">
                        <Badge colorScheme="orange">🔄</Badge>
                        <Text fontSize="sm" color="gray.600">Platform structure changes requiring downloader updates</Text>
                      </HStack>
                      <HStack align="start">
                        <Badge colorScheme="yellow">🌍</Badge>
                        <Text fontSize="sm" color="gray.600">Region-locked or private content</Text>
                      </HStack>
                      <HStack align="start">
                        <Badge colorScheme="gray">❌</Badge>
                        <Text fontSize="sm" color="gray.600">Incorrect or incomplete URL</Text>
                      </HStack>
                    </VStack>
                    <Box bg={accordionBg} p={4} borderRadius="lg">
                      <Text fontSize="sm" color="gray.600" fontWeight="medium">
                        💡 <strong>Troubleshooting tip:</strong> Try using the auto-detect platform option or verify the URL is correct and accessible.
                      </Text>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem 
                  border="1px" 
                  borderColor={borderColor} 
                  borderRadius="xl" 
                  bg={cardBg}
                  shadow="sm"
                  mb={4}
                >
                  <h2>
                    <AccordionButton 
                      py={6} 
                      px={6}
                      _hover={{ bg: hoverBg }}
                      _focus={{ boxShadow: 'none' }}
                      borderRadius="xl"
                    >
                      <HStack flex="1" textAlign="left">
                        <Icon as={FaShieldAlt} color="yellow.500" />
                        <Text fontWeight="semibold" fontSize="lg">
                          Is downloading videos legal?
                        </Text>
                      </HStack>
                      <AccordionIcon color="yellow.500" />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={6} px={6} pt={0}>
                    <Divider mb={4} />
                    <Text color="gray.600" lineHeight="tall" mb={4}>
                      The legality of downloading videos depends on the content and your jurisdiction. Generally:
                    </Text>
                    <VStack align="start" spacing={3} mb={4}>
                      <HStack align="start">
                        <Badge colorScheme="green">✅</Badge>
                        <Text fontSize="sm" color="gray.600">Personal use is often considered fair use in many countries</Text>
                      </HStack>
                      <HStack align="start">
                        <Badge colorScheme="red">❌</Badge>
                        <Text fontSize="sm" color="gray.600">Distribution or commercial use of copyrighted content is generally illegal</Text>
                      </HStack>
                      <HStack align="start">
                        <Badge colorScheme="blue">📋</Badge>
                        <Text fontSize="sm" color="gray.600">Always respect platform terms of service</Text>
                      </HStack>
                    </VStack>
                    <Box bg={accordionBg} p={4} borderRadius="lg">
                      <Text fontSize="sm" color="gray.600" fontWeight="medium">
                        ⚖️ <strong>Disclaimer:</strong> VidDown is provided for personal use only. We encourage respecting copyright laws and platform terms of service.
                      </Text>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem 
                  border="1px" 
                  borderColor={borderColor} 
                  borderRadius="xl" 
                  bg={cardBg}
                  shadow="sm"
                  mb={4}
                >
                  <h2>
                    <AccordionButton 
                      py={6} 
                      px={6}
                      _hover={{ bg: hoverBg }}
                      _focus={{ boxShadow: 'none' }}
                      borderRadius="xl"
                    >
                      <HStack flex="1" textAlign="left">
                        <Icon as={FaCode} color="purple.500" />
                        <Text fontWeight="semibold" fontSize="lg">
                          How can I contribute to VidDown?
                        </Text>
                      </HStack>
                      <AccordionIcon color="purple.500" />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={6} px={6} pt={0}>
                    <Divider mb={4} />
                    <Text color="gray.600" lineHeight="tall" mb={4}>
                      VidDown is an open-source project. You can contribute by:
                    </Text>
                    <VStack align="start" spacing={3} mb={6}>
                      <HStack align="start">
                        <Badge colorScheme="purple">💻</Badge>
                        <Text fontSize="sm" color="gray.600">Downloading the source code and submitting pull requests</Text>
                      </HStack>
                      <HStack align="start">
                        <Badge colorScheme="red">🐛</Badge>
                        <Text fontSize="sm" color="gray.600">Reporting bugs or suggesting features</Text>
                      </HStack>
                      <HStack align="start">
                        <Badge colorScheme="blue">🧪</Badge>
                        <Text fontSize="sm" color="gray.600">Helping us test on different platforms</Text>
                      </HStack>
                      <HStack align="start">
                        <Badge colorScheme="green">📢</Badge>
                        <Text fontSize="sm" color="gray.600">Spreading the word about VidDown</Text>
                      </HStack>
                    </VStack>
                    <Button 
                      colorScheme="purple"
                      leftIcon={<FaDownload />}
                      as="a"
                      href="/api/download-source"
                      download="viddown-source.zip"
                      size="md"
                      borderRadius="lg"
                      shadow="md"
                      _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                      transition="all 0.2s"
                    >
                      Download Source Code
                    </Button>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Box mt={10} mb={8}>
                <Heading as="h2" size="md" mb={4}>Additional resources</Heading>
                <VStack align="stretch" spacing={1}>
                  <Link href="https://github.com/yt-dlp/yt-dlp" isExternal color="brand.500">
                    yt-dlp Documentation
                  </Link>
                  <Link href="https://reactjs.org" isExternal color="brand.500">
                    React Documentation
                  </Link>
                  <Link href="https://flask.palletsprojects.com/" isExternal color="brand.500">
                    Flask Documentation
                  </Link>
                </VStack>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Container>
      
      {/* Footer */}
      <Box bg="gray.50" py={6} borderTop="1px" borderColor={borderColor}>
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
};

export default FAQPage;