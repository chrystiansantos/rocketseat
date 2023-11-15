import { useState } from "react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";
import { Trash, ThumbsUp } from "@phosphor-icons/react";

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  const handleDeleteComment = () => {
    onDeleteComment(content);
  };

  const handleLikeComment = () => {
    setLikeCount((state) => state + 1);
  };

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/chrystiansantos.png" alt="" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Chrystian Santos</strong>
              <time title="31 de Outubro 08:13" dateTime="2023-08-31 08:13:00">
                Cerca de 1 hora atrás
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size="24" />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
