import React from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Icon,
  Badge,
} from '@chakra-ui/react';
import { FaTiktok, FaYoutube, FaFacebook, FaLock } from 'react-icons/fa';

export default function PlatformCard({ platform, onClick, isSelected }) {
  const getIcon = (id) => {
    switch (id) {
      case 'tiktok':
        return FaTiktok;
      case 'youtube':
        return FaYoutube;
      case 'facebook':
        return FaFacebook;
      case 'phub':
        return FaLock;
      default:
        return FaTiktok;
    }
  };

  const getBgColor = (id) => {
    switch (id) {
      case 'tiktok':
        return 'rgba(0, 0, 0, 0.85)';
      case 'youtube':
        return '#ff0000';
      case 'facebook':
        return '#1877f2';
      case 'phub':
        return '#ff9000';
      default:
        return 'gray.100';
    }
  };

  return (
    <Box
      className="platform-card"
      borderRadius="lg"
      overflow="hidden"
      bg={isSelected ? 'brand.50' : 'white'}
      borderWidth={isSelected ? '2px' : '1px'}
      borderColor={isSelected ? 'brand.400' : 'gray.200'}
      boxShadow={isSelected ? 'md' : 'sm'}
      cursor="pointer"
      onClick={onClick}
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'md' }}
    >
      <Flex 
        align="center" 
        justify="center" 
        h="100px" 
        bg={getBgColor(platform.id)}
        color="white"
      >
        <Icon as={getIcon(platform.id)} w={12} h={12} />
      </Flex>
      <Box p={4}>
        <Text fontWeight="bold" fontSize="lg" mb={1}>
          {platform.name}
        </Text>
        <Badge 
          colorScheme="green"
          variant="subtle"
          px={2}
          rounded="full"
        >
          No Watermark
        </Badge>
      </Box>
    </Box>
  );
} 