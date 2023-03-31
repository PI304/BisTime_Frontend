import { Feedback } from './feedbackApi.type';
import instance from '@apis/_axios/instance';

export class FeedbackApi {
  async postFeedback(body: Feedback): Promise<Feedback> {
    const { data } = await instance({
      method: 'POST',
      url: `/api/feedbacks`,
      data: body,
    });
    return data;
  }
}

const feedbackApi = new FeedbackApi();

export default feedbackApi;
