export const infiniteScroll = (setPage, setLoading) => {
  if (isPageFullyScrolled()) {
    setLoading(true);
    setPage((prev) => prev + 1);
  }
};

function isPageFullyScrolled() {
  const documentHeight = document.documentElement.scrollHeight;
  const currentScrollPosition = window.innerHeight + window.pageYOffset;
  return currentScrollPosition >= documentHeight;
}
