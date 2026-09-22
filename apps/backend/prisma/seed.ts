import { Interest } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const INTERESTS: Array<Pick<Interest, 'code' | 'name' | 'sortOrder'>> = [
  { code: 'music', name: '音樂', sortOrder: 1 },
  { code: 'movie', name: '電影', sortOrder: 2 },
  { code: 'travel', name: '旅行', sortOrder: 3 },
  { code: 'food', name: '美食', sortOrder: 4 },
  { code: 'sport', name: '運動', sortOrder: 5 },
  { code: 'game', name: '遊戲', sortOrder: 6 },
  { code: 'reading', name: '閱讀', sortOrder: 7 },
  { code: 'tech', name: '科技', sortOrder: 8 },
  { code: 'art', name: '藝術', sortOrder: 9 },
  { code: 'pet', name: '寵物', sortOrder: 10 },
];

async function main() {
  for (const item of INTERESTS) {
    await prisma.interest.upsert({
      where: { code: item.code },
      update: { name: item.name, sortOrder: item.sortOrder, isActive: true },
      create: item,
    });
  }
  // eslint-disable-next-line no-console
  console.log(`Seeded ${INTERESTS.length} interests`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
