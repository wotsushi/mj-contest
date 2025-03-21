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

export const expectSetDoc = (...expected: unknown[]) => {
  expected.forEach((data) => {
    expect(jest.mocked(setDoc)).toHaveBeenCalledWith(expect.anything(), data);
  });
};

export const expectUpdateDoc = (...expected: unknown[]) => {
  expected.forEach((data) => {
    expect(jest.mocked(updateDoc)).toHaveBeenCalledWith(
      expect.anything(),
      data,
    );
  });
};
