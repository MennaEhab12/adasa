

import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import data from "./posts.json";
import "./BlogDetails.css";

const posts = data.posts ?? [];

function makeId(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\u0600-\u06FF]+/g, "-");
}

function BlogDetails() {
  const { slug } = useParams();

  const article = posts.find((post) => post.slug === slug);

  const sections = useMemo(() => {
    if (!article?.content) return [];

    return article.content
      .split("\n")
      .filter((line) => line.trim().startsWith("## "))
      .map((line) => {
        const title = line.replace(/^##\s*/, "").trim();

        return {
          title,
          id: makeId(title),
        };
      });
  }, [article]);

  if (!article) {
    return (
      <main className="details-not-found" dir="rtl">
        <h1>المقال غير موجود</h1>
        <Link to="/blog">العودة إلى المدونة</Link>
      </main>
    );
  }

  const contentParts = article.content.split("\n");

  return (
    <main className="blog-details-page" dir="rtl">
      <div className="details-container">
        <article className="details-main">
          <Link to="/blog" className="details-back">
            ← العودة إلى المدونة
          </Link>

          <div className="details-category">
            {article.category}
          </div>

          <h1 className="details-title">
            {article.title}
          </h1>

          <p className="details-excerpt">
            {article.excerpt}
          </p>

          <div className="details-author">
            <img
              src={article.author.avatar}
              alt={article.author.name}
            />

            <div>
              <strong>{article.author.name}</strong>
              <span>{article.author.role}</span>
            </div>
          </div>

          <div className="details-info">
            <span>📅 {article.date}</span>
            <span>◷ {article.readTime}</span>
          </div>

          <img
            className="details-cover"
            src={article.image}
            alt={article.title}
          />

          <div className="details-content">
            {contentParts.map((line, index) => {
              const trimmedLine = line.trim();

              if (!trimmedLine) return null;

              if (trimmedLine.startsWith("## ")) {
                const title = trimmedLine.replace(/^##\s*/, "");

                return (
                  <h2
                    key={index}
                    id={makeId(title)}
                    className="details-section-title"
                  >
                    <span>📷</span>
                    {title}
                  </h2>
                );
              }

              return (
                <p key={index}>
                  {trimmedLine}
                </p>
              );
            })}
          </div>

          {article.tags?.length > 0 && (
            <div className="details-tags">
              {article.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          )}

          <Link to="/blog" className="details-back-bottom">
            العودة إلى جميع المقالات
          </Link>
        </article>

        <aside className="details-sidebar">
          <div className="contents-card">
            <div className="contents-heading">
              <h3>محتويات المقال</h3>
              <span>☷</span>
            </div>

            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="contents-link"
              >
                <span className="contents-number">
                  {index + 1}
                </span>

                {section.title}
              </a>
            ))}
          </div>

          <div className="details-stats">
            <div className="stat-box">
              <span>◷</span>
              <strong>{article.readTime}</strong>
              <small>وقت القراءة</small>
            </div>

            <div className="stat-box">
              <span>▣</span>
              <strong>{article.date}</strong>
              <small>تاريخ النشر</small>
            </div>
          </div>

          <div className="author-card">
            <img
              src={article.author.avatar}
              alt={article.author.name}
            />
            <h3>{article.author.name}</h3>
            <p>{article.author.role}</p>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default BlogDetails;
