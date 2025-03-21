import { onSnapshot, setDoc, updateDoc } from "firebase/firestore";

export const mockOnSnapshot = () => {
  const sendSnapshot = {
    call: (_: unknown) => {},
  };
  jest.mocked(onSnapshot).mockImplementation(((
    _: unknown,
    onNext: (_: unknown) => void,
  ) => {
    sendSnapshot.call = (data: unknown) =>
      onNext({
        exists: () => true,
        data: () => data,
      });
  }) as typeof onSnapshot);
  return sendSnapshot;
};

export const expectSetDoc = (expected: unknown) => {
  expect(jest.mocked(setDoc)).toHaveBeenLastCalledWith(
    expect.anything(),
    expected,
  );
};

export const expectUpdateDoc = (expected: unknown) => {
  expect(jest.mocked(updateDoc)).toHaveBeenLastCalledWith(
    expect.anything(),
    expected,
  );
};
