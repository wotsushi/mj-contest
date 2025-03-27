import {
  DocumentData,
  DocumentReference,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { serialize } from ".";

export const mockOnSnapshot = () => {
  const sendSnapshot: Record<string, (data: unknown) => void> = {};
  jest.mocked(onSnapshot).mockImplementation(((
    ref: DocumentReference<DocumentData, DocumentData>,
    onNext: (_: unknown) => void,
  ) => {
    sendSnapshot[ref.id] = (data: unknown) =>
      onNext({
        exists: () => true,
        data: () => serialize(data),
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
