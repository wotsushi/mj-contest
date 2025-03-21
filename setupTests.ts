import "core-js/actual/structured-clone";
import { onSnapshot, setDoc, updateDoc } from "firebase/firestore";

beforeEach(() => {
  jest.mocked(onSnapshot).mockReset();
  jest.mocked(setDoc).mockReset();
  jest.mocked(updateDoc).mockReset();
});
