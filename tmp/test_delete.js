const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testDelete() {
  const courseId = process.argv[2];
  if (!courseId) {
    console.error('Please provide a course ID');
    process.exit(1);
  }

  try {
    console.log(`Attempting to delete course ${courseId}...`);
    const result = await prisma.course.delete({
      where: { id: courseId }
    });
    console.log('Success!', result);
  } catch (err) {
    console.error('DELETE FAILED:', err);
  } finally {
    await prisma.$disconnect();
  }
}

testDelete();
