import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Container, Table } from 'react-bootstrap';
import RemoveClassForm from '@/components/RemoveClassForm';
import { formatCourseNumber } from '@/lib/class-format';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';

const ClassesPage = async () => {
  const currentUser = await loggedInProtectedPage();
  const user = await prisma.user.findUnique({
    where: { email: currentUser.email },
    select: { id: true },
  });

  if (!user) {
    redirect('/auth/signin');
  }

  const classes = await prisma.savedClass.findMany({
    where: { userId: user.id },
    include: { classData: true },
    orderBy: { id: 'desc' },
  });

  return (
    <main>
      <Container className="py-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="mb-0">My Classes</h1>
          <Link className="btn btn-primary" href="/classes/add">
            Add Class
          </Link>
        </div>
        {classes.length > 0 ? (
          <Table bordered hover responsive striped>
            <thead>
              <tr>
                <th>Campus</th>
                <th>Subject</th>
                <th>Course Number</th>
                <th>CRN</th>
                <th>Section</th>
                <th>Instructor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map(({ id, classData }) => (
                <tr key={id}>
                  <td>{classData.campcode}</td>
                  <td>
                    {classData.subjectName} ({classData.subjcode})
                  </td>
                  <td>{formatCourseNumber(classData.crsenumb)}</td>
                  <td>{classData.crn}</td>
                  <td>{classData.seqnumb}</td>
                  <td>{classData.lastName ?? 'Not listed'}</td>
                  <td>
                    <RemoveClassForm id={id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>
            You have not added any classes yet.{' '}
            <Link href="/classes/add">Search the catalog</Link>.
          </p>
        )}
      </Container>
    </main>
  );
};

export default ClassesPage;
