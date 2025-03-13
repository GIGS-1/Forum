import { ToCommentPipe } from './to-comment.pipe';

describe('ToCommentPipe', () => {
  it('create an instance', () => {
    const pipe = new ToCommentPipe();
    expect(pipe).toBeTruthy();
  });
});
