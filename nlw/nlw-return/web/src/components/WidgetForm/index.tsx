import { useState } from 'react';

import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { CloseButtom } from '../CloseButtom';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Image de um inseto',
    },
  },
  IDEA: {
    title: 'Idéia',
    image: {
      source: ideaImageUrl,
      alt: 'Image de uma lâmpada',
    },
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
      alt: 'Image de um balão de pensamento',
    },
  },
};

// export interface IFeedbackType {
//   type: keyof typeof feedbackTypes;
// }

export type IFeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<IFeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleRestartFeedback = () => {
    setFeedbackType(null);
    setFeedbackSent(false);
  };

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStep
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              onFeedbackReestartRequested={handleRestartFeedback}
              feedbackType={feedbackType}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}
      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela{' '}
        <a
          className="underline underline-offset-2"
          href="https://rocketseat.com.br"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  );
}
