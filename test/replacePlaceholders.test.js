const replacePlaceholders = (text, fullname, year) => {
  return text.replace(/\[fullname\]/g, fullname).replace(/\[year\]/g, year);
};

test('should replace placeholder in a string', () => {
  const text = `Lorem[year] ipsum [year]dolor [year] sit amet, [fullname]
  adipiscing elit. Sed et [year] arcu [fullname]accumsan, cursus risus sed,
  ullamcorper arcu.[year][fullname] [fullname][year] Maecenas malesuada
  turpis libero, non consectetur arcu pretium et. In dignissim velit lorem,
  quis tempus felis congue non.[fullname] Cras orci ligula`;

  const expt = `Lorem2023 ipsum 2023dolor 2023 sit amet, Riki Phukon
  adipiscing elit. Sed et 2023 arcu Riki Phukonaccumsan, cursus risus sed,
  ullamcorper arcu.2023Riki Phukon Riki Phukon2023 Maecenas malesuada
  turpis libero, non consectetur arcu pretium et. In dignissim velit lorem,
  quis tempus felis congue non.Riki Phukon Cras orci ligula`;

  const fullname = 'Riki Phukon';
  const year = 2023;

  const replacedText = replacePlaceholders(text, fullname, year);
  expect(replacedText).toBe(expt);
});
