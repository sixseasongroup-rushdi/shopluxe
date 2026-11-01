export default function ProductLoading() {
  return <div className="container pdp-loading" role="status" aria-label="Loading product"><div className="pdp-skeleton-line" /><div className="pdp-loading-grid" aria-hidden="true"><div className="pdp-skeleton-image" /><div><div className="pdp-skeleton-line wide" /><div className="pdp-skeleton-line" /><div className="pdp-skeleton-line short" /><div className="pdp-skeleton-copy" /><div className="pdp-skeleton-line wide" /></div></div><span className="sr-only">Loading your next good find…</span></div>;
}
