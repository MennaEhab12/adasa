
    
import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import data from "./posts.json";
import { Camera } from "lucide-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const posts = Array.isArray(data)
  ? data
  : data.posts ?? data.articles ?? [];

const categories = [
  "All",
  ...new Set(
    (data.categories ?? [])
      .map((category) =>
        typeof category === "string" ? category : category.name
      )
      .filter(Boolean)
  ),
];

const POSTS_PER_PAGE = 6;

function Blogpage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter articles by category and search text
  const filteredArticles = posts.filter((article) => {
    const matchesCategory =
      activeCategory === "All" ||
      article.category === activeCategory;

    const authorName =
      typeof article.author === "object"
        ? article.author?.name ?? ""
        : article.author ?? "";

    const searchableText = [
      article.title,
      article.description,
      article.content,
      article.category,
      authorName,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(
      search.trim().toLowerCase()
    );

    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(
    filteredArticles.length / POSTS_PER_PAGE
  );

  const safePage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );

  const startIndex = (safePage - 1) * POSTS_PER_PAGE;

  const currentArticles = filteredArticles.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );
 
 
  function handleCategory(category) {
    setActiveCategory(category);
    setCurrentPage(1);
  }

  function handleSearch(value) {
    setSearch(value);
    setCurrentPage(1);
  }

  function clearFilters() {
    setSearch("");
    setActiveCategory("All");
    setCurrentPage(1);
  }

  

  function getArticleImage(article) {
    return (
      article.image ??
      article.coverImage ??
      article.thumbnail ??
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1000&q=85"
    );
  }

  function getAuthor(article) {
    if (typeof article.author === "object" && article.author) {
      return article.author;
    }

    return {
      name: article.author || "Adasa Team",
      avatar: "",
    };
  }

  return (
    <div className="app">
      {/* Navigation */}
      <header className="navbar" id="home">
        <a className="logo" href="#home">
          <span className="logo-icon">ع</span>
          <span>
            Adasa<span className="logo-dot">.</span>
          </span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#articles" className="active-link">
            Blog
          </a>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
        </nav>

        <a className="nav-button" href="#articles">
          Explore Articles <span>↗</span>
        </a>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero">
          
          <div className="hero-content">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              THE WORLD THROUGH YOUR LENS
            </div>

            <h1>
              Every picture
              <br />
              tells a <span>story.</span>
            </h1>

            <p className="hero-description">
              Explore the art of photography. Discover inspiration,
              learn new techniques, and see the world differently
              through the eyes of passionate photographers.
            </p>

            <a href="#articles" className="primary-button">
              Discover Stories <span>↘</span>
            </a>

            <div className="hero-stats">
              <div>
                <strong>{posts.length}+</strong>
                <span>Photography stories</span>
              </div>

              <div>
                <strong>{categories.length - 1}</strong>
                <span>Categories</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>Creative inspiration</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <img
              className="hero-image"
              src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=90"
              alt="Photography camera"
            />

            <div className="image-caption">
              <span className="caption-dot" />
              CAPTURE THE MOMENT
            </div>

            <div className="floating-note">
              <span className="note-icon">✳</span>
              <div>
                <strong>See differently.</strong>
                <span>Tell your own story.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="articles-section" id="articles">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-line" />
                THE ADASA JOURNAL
              </div>

              <h2>
                Stories worth <span>seeing.</span>
              </h2>

              <p>
                Tips, ideas, and inspiration for your next great shot.
              </p>
            </div>

            <div className="article-count">
              <strong>
                {String(filteredArticles.length).padStart(2, "0")}
              </strong>
              <span>ARTICLES FOUND</span>
            </div>
          </div>

          {/* Categories and Search */}
          <div className="article-tools" id="categories">
            <div className="category-list">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    activeCategory === category
                      ? "category-button selected"
                      : "category-button"
                  }
                  onClick={() => handleCategory(category)}
                >
                  {category === "All"
                    ? "جميع المقالات"
                    : category}
                </button>
              ))}
            </div>

            <label className="search-box">
              <span>⌕</span>

              <input
                type="search"
                placeholder="ابحث في المقالات..."
                value={search}
                onChange={(event) =>
                  handleSearch(event.target.value)
                }
              />

              {search && (
                <button
                  type="button"
                  onClick={() => handleSearch("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </label>
          </div>

          {/* Article Cards */}
          {currentArticles.length > 0 ? (
            <div className="articles-grid">
              {currentArticles.map((article, index) => {
                const articleUrl = `/blog/${article.slug}`;
                 const author = getAuthor(article);
               const authorName = author.name ?? "Adasa Team";
                const articleImage = getArticleImage(article);
              
           
               

                return (
                  <article
                    className="article-card"
                  key={article.slug}
                  >
                    <Link
                      className="article-image-link"
                      to={articleUrl}
                      aria-label={`Read ${article.title ?? "article"}`}
                    >
                      <img
                        className="article-image"
                        src={articleImage}
                        alt={article.title ?? "Photography article"}
                        loading="lazy"
                      />

                      <span className="article-category">
                        {article.category ?? "Photography"}
                      </span>

                      <span className="image-arrow">↗</span>
                    </Link>

                    <div className="article-body">
                      <div className="article-meta">
                        <span>
                          {article.date
                            ? new Date(
                                article.date
                              ).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : ""}
                        </span>

                        <span>·</span>

                        <span>
                          {article.readTime ?? "5 min read"}
                        </span>
                      </div>

                      <h3>
                        <Link to={articleUrl}>
                          {article.title ?? "Untitled article"}
                        </Link>
                      </h3>

                      <p>
                        {article.description ??
                          article.content?.slice(0, 150) ??
                          "Discover more photography inspiration."}
                      </p>

                      <div className="article-footer">
                        <div className="author">
                          {author.avatar ? (
                            <img
                              className="author-avatar"
                              src={author.avatar}
                              alt={authorName}
                            />
                          ) : (
                            <span className="author-avatar">
                              {authorName.charAt(0).toUpperCase()}
                            </span>
                          )}

                          <span>{authorName}</span>
                        </div>

                        <Link
                          to={articleUrl}
                          className="read-arrow"
                          aria-label={`Read ${article.title ?? "article"}`}
                        >
                          ↗
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <span>⌕</span>
              <h3>لا توجد مقالات</h3>
              <p>
                جربي البحث بكلمة أخرى أو اختاري تصنيفًا مختلفًا.
              </p>

              <button
                type="button"
                className="primary-button"
                onClick={clearFilters}
              >
                عرض جميع المقالات
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 0 && (
            <>
              <div className="pagination">
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() =>
                    setCurrentPage((page) => page - 1)
                  }
                  aria-label="Previous page"
                >
                  ❯
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    type="button"
                    key={page}
                    className={
                      safePage === page ? "current" : ""
                    }
                    onClick={() => setCurrentPage(page)}
                    aria-current={
                      safePage === page ? "page" : undefined
                    }
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={safePage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => page + 1)
                  }
                  aria-label="Next page"
                >
                  ❮
                </button>
              </div>

              <p className="page-info">
                صفحة {safePage} من {totalPages}
              </p>
            </>
          )}
        </section>

        {/* About Section */}
        <section className="newsletter" id="about">
          <div className="newsletter-symbol">✳</div>

          <div>
            <div className="eyebrow">STAY INSPIRED</div>
            <h2>See the world a little differently.</h2>
            <p>
              Keep exploring new perspectives, techniques, and stories
              from the world of photography.
            </p>
          </div>

          <a href="#articles" className="primary-button">
            Explore the Journal <span>↗</span>
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <a className="logo" href="#home">
          <span className="logo-icon">ع</span>
          <span>
            Adasa<span className="logo-dot">.</span>
          </span>
        </a>

        <p>See the world through a different lens.</p>

        <span className="copyright">
          © 2026 Adasa Photography Journal
        </span>
      </footer>
    </div>
 
  );
}

export default Blogpage;
