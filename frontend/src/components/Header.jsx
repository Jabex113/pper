import React from 'react';
import {
  Box,
  Flex,
  Text,
  HStack,
  Link,
  Button,
  useColorModeValue,
  Container,
  IconButton,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaDownload } from 'react-icons/fa';

const Links = [
  { name: 'Home', path: '/' },
  { name: 'How It Works', path: '/#how-it-works' },
  { name: 'FAQs', path: '/faq' }
];

const NavLink = ({ children, to }) => (
  <Link
    as={RouterLink}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.100', 'gray.700'),
    }}
    to={to}
  >
    {children}
  </Link>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box 
      as="header" 
      bg={useColorModeValue('white', 'gray.800')}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      position="sticky"
      top={0}
      zIndex={1000}
      shadow="sm"
    >
      <Container maxW={'container.xl'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Flex align="center" as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
                <FaDownload size={24} color="#741aff" />
                <Text
                  ml={2}
                  fontWeight="bold"
                  fontSize="xl"
                  className="gradient-text"
                >
                  VidDown
                </Text>
              </Flex>
            </Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.name} to={link.path}>{link.name}</NavLink>
              ))}
            </HStack>
          </HStack>
          
          <Button
            as={RouterLink}
            to="/#download"
            fontSize={'sm'}
            fontWeight={600}
            variant={'outline'}
            colorScheme="brand"
            leftIcon={<FaDownload />}
          >
            Download Now
          </Button>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} to={link.path}>{link.name}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
} 