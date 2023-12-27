import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'

import { useTranslation } from 'react-i18next'
import { CyclesContext } from '../../../../context/CyclesContext'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

export function NewCycleForm() {
  const { activeCycle, cycles } = useContext(CyclesContext)
  const { register } = useFormContext()
  const { t } = useTranslation('form')

  return (
    <FormContainer>
      <label htmlFor="task">{t('label_task')}</label>
      <TaskInput
        id="task"
        type="text"
        placeholder={t('placeholder_text')}
        list="task-suggestions"
        disabled={!!activeCycle}
        {...register('task')}
      />
      <datalist id="task-suggestions">
        {cycles.map((cycle) => (
          <option key={cycle.id} value={cycle.task} />
        ))}
      </datalist>

      <label htmlFor="minutesAmount">{t('label_minutes')}</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        max={60}
        min={0}
        disabled={!!activeCycle}
        {...register('minutesAmount', {
          valueAsNumber: true,
        })}
      />

      <span>{t('span_minutes')}</span>
    </FormContainer>
  )
}
