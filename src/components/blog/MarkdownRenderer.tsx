import ReactMarkdown from "react-markdown";
import styles from "@/app/blog/[slug]/post.module.css";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </div>
  );
}
