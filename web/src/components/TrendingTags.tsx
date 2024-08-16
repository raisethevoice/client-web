const trendings = [
  { label: 'FightForChange' },
  { label: 'AffordableHousing' },
  { label: 'ProtectOurPlanet' },
  { label: 'FairTrade' },
  { label: 'DigitalRights' },
  { label: 'CleanEnergy' },
  { label: 'RuralDevelopment' },
  { label: 'CulturalHeritage' },
  { label: 'StopDiscrimination' },
  { label: 'BreakingBarriers' },
  { label: 'CommunitySupport' },
  { label: 'ReformNow' },
];

export default function TrendingTags() {
  return (
    <div className="min-h-[250px]">
      <div className="flex items-center mb-2">
        <h1 className="text-xl font-bold">Topics</h1>
      </div>

      <div className="flex flex-wrap gap-y-0.5 gap-x-2">
        {trendings.map((trending) => (
          <div className="font-semibold text-[15px] cursor-pointer hover:bg-gray-100 rounded">
            #{trending.label}
          </div>
        ))}
      </div>
    </div>
  );
}
