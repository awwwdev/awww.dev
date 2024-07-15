const getProperPackageId = (packages: any) => {
  const packagesFormatted = packages.map(p => ({id: p.id, date: p.datePackagePurchased, sessionsLeftCount: calcSessionsLeftCount(p) }));
  const packagesWithSessionsLeft = packagesFormatted.filter(p => p.sessionsLeftCount >0);
  const sessionsLeftCountArray = packagesWithSessionsLeft.map(p => p.sessionsLeftCount);
  const minSessionsLeftCount = Math.min(...sessionsLeftCountArray);

  const packagesWithMinSessionsLeftCount = packagesWithSessionsLeft.filter(p => p.sessionsLeftCount === minSessionsLeftCount);

  if (packagesWithMinSessionsLeftCount.length === 0) return null;
  if (packagesWithMinSessionsLeftCount.length === 1) return packagesWithMinSessionsLeftCount[0].id;
  const oldestPackageWithMinSessionsLeftCount = packagesWithMinSessionsLeftCount.reduce((acc, cur) => {
    const accDate = new Date(acc);
    const curDate = new Date(cur);
    if (accDate.getTime() < curDate.getTime()) return acc;
    return cur;
  })
  return oldestPackageWithMinSessionsLeftCount.id;
};

export default getProperPackageId;

const calcSessionsLeftCount = (pa: any) => {
  const sessionsLeft = pa.numberOfSessions - pa.session.length;
  return sessionsLeft;
}
