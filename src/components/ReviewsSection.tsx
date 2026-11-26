import { useState, type FormEvent } from 'react';
import { STORE_INFO, type ReviewItem } from '../shared/menuData.ts';
import { submitReview } from '../lib/clientApi.ts';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  averageRating: number;
  onReviewSubmitted: (review: ReviewItem) => void;
}

function renderStars(rating: number) {
  const icons: string[] = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      icons.push('star');
    } else if (rating >= i - 0.5) {
      icons.push('star_half');
    } else {
      icons.push('star_outline');
    }
  }
  return icons;
}

export function ReviewsSection({
  reviews,
  averageRating,
  onReviewSubmitted,
}: ReviewsSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('Tabarbour Local');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    try {
      const result = await submitReview({ author, role, rating, comment });
      if (!result.ok) {
        setErrors(result.errors);
        return;
      }

      onReviewSubmitted(result.review);
      setAuthor('');
      setRole('Tabarbour Local');
      setRating(5);
      setComment('');
      setModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="reviews" className="py-10 lg:py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 lg:mb-10">
          <div>
            <div className="flex items-center gap-2 text-street-yellow font-montserrat font-black text-xs uppercase tracking-wider tabular-nums">
              <span className="material-symbols-outlined material-fill text-[16px]">star</span>
              <span>
                {averageRating.toFixed(1)} Google Reviews • Tabarbour Community ({reviews.length})
              </span>
            </div>
            <h2 className="font-montserrat font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mt-1">
              WHAT AMMAN EATERS SAY
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="btn btn-sm h-10 px-4 rounded-xl bg-street-red hover:bg-red-700 border-none text-white font-montserrat font-black text-xs uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[16px]">rate_review</span>
              <span>Write a Review</span>
            </button>
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-ghost h-10 px-3 text-street-yellow hover:text-white font-montserrat font-bold text-xs"
            >
              <span>View on Google Maps</span>
              <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
            </a>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div
          data-testid="reviews-grid"
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6"
        >
          {reviews.map((rev) => (
            <article
              key={rev.id}
              className="card p-6 rounded-2xl bg-surface-container border border-white/10 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div
                  className="flex items-center gap-0.5 text-street-yellow mb-3"
                  aria-label={`${rev.rating} out of 5 stars`}
                >
                  {renderStars(rev.rating).map((icon, idx) => (
                    <span
                      key={idx}
                      className="material-symbols-outlined material-fill text-[18px]"
                    >
                      {icon}
                    </span>
                  ))}
                </div>
                <p className="text-white text-sm font-inter leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <span className="font-montserrat font-bold text-xs text-white">{rev.author}</span>
                <span className="text-[11px] text-on-surface-variant font-medium">{rev.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* DaisyUI Modal for Writing a Community Review */}
      {modalOpen && (
        <div
          className="modal modal-open"
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-modal-title"
        >
          <div className="modal-box bg-surface-container border border-white/15 text-white max-w-md rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] font-montserrat font-black uppercase tracking-widest text-street-yellow">
                  Tabarbour Community
                </span>
                <h3
                  id="review-modal-title"
                  className="font-montserrat font-black text-xl text-white uppercase"
                >
                  Share Your Crazy Taste Review
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close review modal"
                className="btn btn-sm btn-circle btn-ghost text-zinc-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.form && (
                <div role="alert" className="alert bg-street-red/20 border border-street-red text-xs text-white py-2">
                  <span>{errors.form}</span>
                </div>
              )}

              <div>
                <label
                  htmlFor="review-author"
                  className="block font-montserrat font-bold text-xs uppercase text-on-surface-variant mb-1.5"
                >
                  Your Name
                </label>
                <input
                  id="review-author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Kareem N."
                  className="input input-bordered w-full bg-surface-container-low border-white/15 focus:border-street-red text-sm text-white"
                />
                {errors.author && (
                  <p className="text-xs text-primary-soft mt-1">{errors.author}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="review-role"
                    className="block font-montserrat font-bold text-xs uppercase text-on-surface-variant mb-1.5"
                  >
                    Order Type
                  </label>
                  <select
                    id="review-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="select select-bordered w-full bg-surface-container-low border-white/15 focus:border-street-red text-xs text-white"
                  >
                    <option value="Tabarbour Local">Tabarbour Local</option>
                    <option value="Late-Night Regular">Late-Night Regular</option>
                    <option value="Direct Pickup">Direct Pickup</option>
                    <option value="Order via Talabat">Order via Talabat</option>
                    <option value="Order via Careem">Order via Careem</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="review-rating"
                    className="block font-montserrat font-bold text-xs uppercase text-on-surface-variant mb-1.5"
                  >
                    Star Rating
                  </label>
                  <select
                    id="review-rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="select select-bordered w-full bg-surface-container-low border-white/15 focus:border-street-red text-xs text-street-yellow font-bold"
                  >
                    <option value={5}>5.0 — Crazy Good</option>
                    <option value={4.5}>4.5 — Fire</option>
                    <option value={4}>4.0 — Great</option>
                    <option value={3}>3.0 — Solid</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="review-comment"
                  className="block font-montserrat font-bold text-xs uppercase text-on-surface-variant mb-1.5"
                >
                  What did you order?
                </label>
                <textarea
                  id="review-comment"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell Amman about the Michigan Mushroom burger, Super Saj, or 3 AM vibes..."
                  className="textarea textarea-bordered w-full bg-surface-container-low border-white/15 focus:border-street-red text-sm text-white"
                />
                {errors.comment && (
                  <p className="text-xs text-primary-soft mt-1">{errors.comment}</p>
                )}
              </div>

              <div className="modal-action mt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-sm btn-ghost text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-sm bg-street-red hover:bg-red-700 border-none text-white font-montserrat font-black uppercase px-5"
                >
                  {submitting ? 'Posting...' : 'Post Review'}
                </button>
              </div>
            </form>
          </div>
          <button
            type="button"
            className="modal-backdrop bg-black/70"
            aria-label="Dismiss modal"
            onClick={() => setModalOpen(false)}
          />
        </div>
      )}
    </section>
  );
}
