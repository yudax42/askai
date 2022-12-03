export default async function (): Promise<string> {
  const removeZeroWidthSpace = (str: string) =>
    str.replace(/[\u200B-\u200D\uFEFF]/g, "");

  const CONVERSTATION_ITEMS_SELECTOR =
    "div[class*='ConversationItem__Message']";
  const CONVERSTATION_ITEMS_LAST_SELECTOR =
    "div:nth-child(2) div[class*='request'";
  const CONVERSTATION_LOADING_STATE_VALUE = "<p></p>";
  const CONVERSTATION_CHECK_INTERVAL = 800;

  const conversationItems = document.querySelectorAll(
    CONVERSTATION_ITEMS_SELECTOR
  );
  const lastItem = conversationItems[
    conversationItems.length - 1
  ].querySelector(CONVERSTATION_ITEMS_LAST_SELECTOR);

  if (!lastItem) return "";

  return await new Promise((resolve) => {
    let last = lastItem.innerHTML;

    const interval = setInterval(() => {
      if (
        last === lastItem.innerHTML &&
        removeZeroWidthSpace(last) !== CONVERSTATION_LOADING_STATE_VALUE
      ) {
        clearInterval(interval);
        resolve(last);
      }
      last = lastItem.innerHTML;
    }, CONVERSTATION_CHECK_INTERVAL);
  });
}
