export default function paginationConfig(total, current, ...props) {
  return {
    showSizeChanger: false,
    page: 10,
    props,
    total,
    current,
  };
}
