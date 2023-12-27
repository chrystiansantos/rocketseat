import { formatDistanceToNow } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import ptBR from 'date-fns/locale/pt-BR'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import notTask from '../../assets/not-task.png'
import { CyclesContext } from '../../context/CyclesContext'
import { EmptyList, HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)
  const { t, i18n } = useTranslation('history')

  return (
    <HistoryContainer>
      {cycles.length ? (
        <>
          <h1>{t('title')}</h1>
          <HistoryList>
            <table>
              <thead>
                <tr>
                  <th>{t('table.task')}</th>
                  <th>{t('table.during')}</th>
                  <th>{t('table.start')}</th>
                  <th>{t('table.status')}</th>
                </tr>
              </thead>
              <tbody>
                {cycles.map((cycle) => (
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>
                      {cycle.minutesAmount} {t('minutes')}
                    </td>
                    <td>
                      {formatDistanceToNow(new Date(cycle.startDate), {
                        addSuffix: true,
                        locale: i18n.language === 'pt-BR' ? ptBR : enUS,
                      })}
                    </td>
                    <td>
                      {cycle.finishedDate && (
                        <Status statusColor="green">
                          {t('status_label.finished')}
                        </Status>
                      )}
                      {cycle.interruptedDate && (
                        <Status statusColor="red">
                          {t('status_label.interrupted')}
                        </Status>
                      )}
                      {!cycle.interruptedDate && !cycle.finishedDate && (
                        <Status statusColor="yellow">
                          {t('status_label.progress')}
                        </Status>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </HistoryList>
        </>
      ) : (
        <EmptyList>
          <img src={notTask} alt="" />
          <span>{t('not_task')}</span>
        </EmptyList>
      )}
    </HistoryContainer>
  )
}
