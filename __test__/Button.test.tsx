import Button from "@/components/Button";
import { render, screen, fireEvent } from "@testing-library/react-native";

test("basic test", () => {
  const mockOnPress = jest.fn();
  render(
    <Button testId="testButton" onPress={mockOnPress}>
      test
    </Button>
  );

  const button = screen.getByTestId("testButton");
  fireEvent(button, "press");

  console.log(button.props);
  expect(button.props.style.borderRadius).toBe(12);
  expect(mockOnPress).toHaveBeenCalled();
  expect(button).toBeTruthy();
});
