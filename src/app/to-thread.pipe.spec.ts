import { ToThreadPipe } from './to-thread.pipe';

describe('ToThreadPipe', () => {
  it('create an instance', () => {
    const pipe = new ToThreadPipe();
    expect(pipe).toBeTruthy();
  });
});
