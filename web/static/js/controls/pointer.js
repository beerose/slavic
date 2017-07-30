const pointer = {
  init(tink) {
    Object.setPrototypeOf(pointer, tink.makePointer());
  },
};

export default pointer;
