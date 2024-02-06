import { feedbackTypes, IFeedbackType } from '..';
import { CloseButtom } from '../../CloseButtom';

interface IFeedbackTypeStepProps {
  onFeedbackTypeChanged: (type: IFeedbackType) => void;
}

export function FeedbackTypeStep({
  onFeedbackTypeChanged,
}: IFeedbackTypeStepProps) {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>
        <CloseButtom />
      </header>
      <div className="flex py-8 gap-2 w-full ">
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <button
            type="button"
            key={key}
            onClick={() => onFeedbackTypeChanged(key as IFeedbackType)}
            className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
          >
            <img src={value.image.source} alt={value.image.source} />
            <span>{value.title}</span>
          </button>
        ))}
      </div>
    </>
  );
}
