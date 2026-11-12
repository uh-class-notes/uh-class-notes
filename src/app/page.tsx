import Link from 'next/link';
import { auth } from '@/lib/auth';

const Home = async () => {
  const session = await auth();

  return (
    <main className="container py-5">
      <h1>UH Class Notes</h1>
      <p>Manage class resources and study materials.</p>
      {session?.user?.email ? (
        <section>
          <p>Signed in as {session.user.email}.</p>
          <div className="d-flex flex-wrap gap-2">
            <Link className="btn btn-primary" href="/classes">
              View Classes
            </Link>
            <Link className="btn btn-outline-primary" href="/classes/add">
              Add Class
            </Link>
            <Link className="btn btn-primary" href="/list">
              View My Stuff
            </Link>
            <Link className="btn btn-outline-primary" href="/add">
              Add Stuff
            </Link>
            {session.user.role === 'ADMIN' && (
              <Link className="btn btn-outline-secondary" href="/admin">
                Admin Dashboard
              </Link>
            )}
          </div>
        </section>
      ) : (
        <div className="d-flex gap-2">
          <Link className="btn btn-primary" href="/auth/signin">
            Sign in
          </Link>
          <Link className="btn btn-outline-primary" href="/auth/signup">
            Sign up
          </Link>
        </div>
      )}
    </main>
  );
};

export default Home;
