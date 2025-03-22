import "@testing-library/jest-dom";
import "core-js/actual/structured-clone";
import { TextEncoder } from "util";
import { onSnapshot, setDoc, updateDoc } from "firebase/firestore";

global.TextEncoder = TextEncoder;

beforeEach(() => {
  jest.mocked(onSnapshot).mockReset();
  jest.mocked(setDoc).mockReset();
  jest.mocked(updateDoc).mockReset();
});
