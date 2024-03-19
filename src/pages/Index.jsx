import React, { useState } from "react";
import { Box, VStack, HStack, Text, Textarea, Button, useToast } from "@chakra-ui/react";
import { FaPlus, FaSave, FaShare, FaRobot } from "react-icons/fa";

const COMPONENT_LIBRARY = [
  { id: 1, type: "Greeting", text: "Hi [Name]," },
  { id: 2, type: "Introduction", text: "I'm reaching out from [Company] because..." },
  { id: 3, type: "Value Prop", text: "Our product can help you [benefit] by [feature]." },
  { id: 4, type: "CTA", text: "Are you available for a quick call on [Date/Time]?" },
  { id: 5, type: "Signature", text: "Best regards,\n[Your Name]\n[Title] at [Company]" },
];

const PromptBox = ({ component, onTextChange, onRemove }) => (
  <Box borderWidth={1} borderRadius="lg" p={3} mb={2}>
    <HStack justify="space-between">
      <Text fontWeight="bold">{component.type}</Text>
      <Button size="xs" onClick={onRemove}>
        X
      </Button>
    </HStack>
    <Textarea defaultValue={component.text} onChange={(e) => onTextChange(component.id, e.target.value)} />
  </Box>
);

const Index = () => {
  const [prompt, setPrompt] = useState([]);
  const toast = useToast();

  const addComponent = (component) => {
    setPrompt([...prompt, { ...component, id: Date.now() }]);
  };

  const updateComponentText = (id, text) => {
    setPrompt(prompt.map((c) => (c.id === id ? { ...c, text } : c)));
  };

  const removeComponent = (id) => {
    setPrompt(prompt.filter((c) => c.id !== id));
  };

  const assemblePrompt = () => {
    return prompt.map((c) => c.text).join("\n\n");
  };

  const handleSave = () => {
    localStorage.setItem("savedPrompt", JSON.stringify(prompt));
    toast({
      title: "Prompt saved",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(assemblePrompt());
    toast({
      title: "Prompt copied to clipboard",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleGenerate = () => {
    toast({
      title: "Generating cold email...",
      description: "This is a placeholder. Integrate with your LLM API here.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="2xl" mx="auto" p={5}>
      <Text fontSize="3xl" mb={4}>
        Cold Email Prompt Builder
      </Text>
      <HStack mb={4}>
        {COMPONENT_LIBRARY.map((component) => (
          <Button key={component.id} onClick={() => addComponent(component)} leftIcon={<FaPlus />}>
            {component.type}
          </Button>
        ))}
      </HStack>
      <VStack align="stretch" mb={4}>
        {prompt.map((component) => (
          <PromptBox key={component.id} component={component} onTextChange={updateComponentText} onRemove={() => removeComponent(component.id)} />
        ))}
      </VStack>
      <HStack>
        <Button onClick={handleSave} leftIcon={<FaSave />}>
          Save Prompt
        </Button>
        <Button onClick={handleShare} leftIcon={<FaShare />}>
          Share Prompt
        </Button>
        <Button colorScheme="blue" onClick={handleGenerate} leftIcon={<FaRobot />}>
          Generate Cold Email
        </Button>
      </HStack>
      <Box mt={8}>
        <Text fontSize="xl" mb={2}>
          Prompt Preview:
        </Text>
        <Box p={4} borderWidth={1} borderRadius="lg">
          <Text whiteSpace="pre-line">{assemblePrompt()}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
