module.exports = {
  getFirestore: jest.fn(),
  doc: jest.fn().mockImplementation((_db, _collection, id) => ({ id })),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  onSnapshot: jest.fn(),
};
