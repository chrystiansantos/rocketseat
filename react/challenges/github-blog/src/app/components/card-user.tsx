import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare,
  faBuilding,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { Link } from '../components/link'

interface CardUserProps {
  userInfo: {
    name: string
    login: string
    bio: string
    company: string
    followers: number
  }
}

export function CardUser({
  userInfo: { name, login, bio, company, followers },
}: CardUserProps) {
  return (
    <header className="bg-profile py-8 px-6 -mt-20 rounded-lg flex flex-col gap-8 items-center md:flex-row">
      <Image
        src={`https://github.com/${login}.png`}
        height={148}
        width={148}
        alt=""
        className="rounded-lg"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <strong className="font-bold text-2xl text-title">{name}</strong>
          <Link
            endIcon={faArrowUpRightFromSquare}
            href={`https://github.com/${login}`}
            content="Github"
          />
        </div>
        <span className="text-text pt-2">{bio}</span>
        <div className="flex items-center justify-between gap-2 mt-6 md:gap-6 md:justify-normal">
          <span className="flex items-center gap-2 text-subtitle">
            <FontAwesomeIcon
              height={18}
              width={18}
              icon={faGithub}
              color="#3A536B"
            />
            {login}
          </span>
          <span className="flex items-center gap-2 text-subtitle">
            <FontAwesomeIcon
              height={18}
              width={18}
              icon={faBuilding}
              color="#3A536B"
            />
            {company}
          </span>
          <span className="flex items-center gap-2 text-subtitle">
            <FontAwesomeIcon
              height={18}
              width={18}
              icon={faUserGroup}
              color="#3A536B"
            />
            {followers} seguidores
          </span>
        </div>
      </div>
    </header>
  )
}
