module.exports = {
  getFirestore: jest.fn(),
  doc: jest.fn().mockReturnValue({}),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  onSnapshot: jest.fn(),
};
