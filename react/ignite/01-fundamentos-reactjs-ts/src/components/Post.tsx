import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";

interface Author {
  name: string;
  avatarUrl: string;
  role: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

export function Post({ post: { author, content, publishedAt } }: PostProps) {
  const [comments, setComments] = useState(["Post muito bacana, hein ?"]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = format(publishedAt, "d LLLL 'às' HH:mm'h'", {
    locale: ptBr,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: true,
  });

  const handleCreateNewComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText("");
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentText(e.target.value);
    e.target.setCustomValidity("");
  };

  const handleNewCommentInvalid = (e: InvalidEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity("Este campo é obrigatorio");
  };

  const deleteComment = (commentToDelete: string) => {
    const commentsWithoutDeletedOne = comments.filter(
      (comment) => comment !== commentToDelete
    );
    setComments(commentsWithoutDeletedOne);
  };

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>
      <form onSubmit={handleCreateNewComment} className={styles.comentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          value={newCommentText}
          onChange={handleCommentChange}
          placeholder="Deixe um comentário"
          onInvalid={handleNewCommentInvalid}
          required
        ></textarea>
        <footer>
          <button disabled={isNewCommentEmpty} type="submit">
            Publicar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
}
