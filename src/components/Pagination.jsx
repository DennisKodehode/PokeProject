export default function Pagination({ page, maxPage, onPrev, onNext }) {
  return (
    <div className="page-btns-wrapper">
      <button
        type="button"
        className="page-btn"
        onClick={onPrev}
        disabled={page <= 1}
      >
        Previous
      </button>

      <p>{page}</p>

      <button
        type="button"
        className="page-btn"
        onClick={onNext}
        disabled={page >= maxPage}
      >
        Next
      </button>
    </div>
  );
}
