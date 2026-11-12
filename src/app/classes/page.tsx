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
    include: { classOffering: true },
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
              {classes.map(({ id, classOffering }) => (
                <tr key={id}>
                  <td>{classOffering.campcode}</td>
                  <td>
                    {classOffering.subjectName} ({classOffering.subjcode})
                  </td>
                  <td>{formatCourseNumber(classOffering.crsenumb)}</td>
                  <td>{classOffering.crn}</td>
                  <td>{classOffering.seqnumb}</td>
                  <td>{classOffering.lastName ?? 'Not listed'}</td>
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
