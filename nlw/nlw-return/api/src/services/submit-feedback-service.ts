import { IMailAdapter } from "../adapters/mail-adapter";
import { IFeedbacksRepository } from "../repositories/feedbacks-repository";

interface ISubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string
}

export class SubmitFeedbackUseCase {

  constructor(
    private feedbacksRepository: IFeedbacksRepository,
    private mailAdaptere: IMailAdapter
  ) { }

  async execute(data: ISubmitFeedbackUseCaseRequest): Promise<any> {
    const { type, comment, screenshot } = data;

    if (!type) {
      throw new Error('Type is required.')
    }
    if (!comment) {
      throw new Error('Comment is required.')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('invalid screenshot format.')
    }

    await this.feedbacksRepository.create({ type, comment, screenshot })
    await this.mailAdaptere.sendMail({
      subject: 'Novo Feedback',
      body: [
        '<div style="font-family: sans-serif; font-size:16px; color:#222">',
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário do feedback: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}"/>` : null,
        '</div>'
      ].join('\n')
    })
  }

}