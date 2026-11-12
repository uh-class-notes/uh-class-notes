'use client';

import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { addClass } from '@/lib/classActions';
import { formatCourseNumber } from '@/lib/class-format';

type ClassOption = {
  id: number;
  campcode: string;
  crn: string;
  subjcode: string;
  crsenumb: string;
  seqnumb: string;
  lastName: string | null;
  subjectName: string;
};

type ClassSearchFormProps = {
  classOptions: ClassOption[];
  savedClassIds: number[];
};

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

const ClassSearchForm = ({
  classOptions,
  savedClassIds,
}: ClassSearchFormProps) => {
  const [campus, setCampus] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [courseNumber, setCourseNumber] = useState('');
  const savedIds = new Set(savedClassIds);
  const campuses = uniqueSorted(classOptions.map((item) => item.campcode));
  const subjectCodes = uniqueSorted(
    classOptions
      .filter((item) => item.campcode === campus)
      .map((item) => item.subjcode),
  );
  const courseNumbers = uniqueSorted(
    classOptions
      .filter(
        (item) => item.campcode === campus && item.subjcode === subjectCode,
      )
      .map((item) => formatCourseNumber(item.crsenumb)),
  );
  const matchingClasses = classOptions
    .filter(
      (item) =>
        item.campcode === campus &&
        item.subjcode === subjectCode &&
        formatCourseNumber(item.crsenumb) === courseNumber,
    )
    .sort((a, b) => a.seqnumb.localeCompare(b.seqnumb));

  return (
    <section>
      <div className="card card-body mb-4">
        <div className="mb-3">
          <label className="form-label" htmlFor="class-campus">
            Campus
          </label>
          <select
            className="form-select"
            id="class-campus"
            value={campus}
            onChange={(event) => {
              setCampus(event.target.value);
              setSubjectCode('');
              setCourseNumber('');
            }}
          >
            <option value="">Select a campus</option>
            {campuses.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="class-subject-code">
            Subject Code
          </label>
          <select
            className="form-select"
            disabled={!campus}
            id="class-subject-code"
            value={subjectCode}
            onChange={(event) => {
              setSubjectCode(event.target.value);
              setCourseNumber('');
            }}
          >
            <option value="">Select a subject code</option>
            {subjectCodes.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label" htmlFor="class-course-number">
            Course Number
          </label>
          <select
            className="form-select"
            disabled={!subjectCode}
            id="class-course-number"
            value={courseNumber}
            onChange={(event) => setCourseNumber(event.target.value)}
          >
            <option value="">Select a course number</option>
            {courseNumbers.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      {courseNumber &&
        (matchingClasses.length > 0 ? (
          <Table bordered hover responsive striped>
            <thead>
              <tr>
                <th>Course</th>
                <th>CRN</th>
                <th>Section</th>
                <th>Instructor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {matchingClasses.map((item) => {
                const alreadySaved = savedIds.has(item.id);
                return (
                  <tr key={item.id}>
                    <td>
                      {item.subjectName} ({item.subjcode}{' '}
                      {formatCourseNumber(item.crsenumb)})
                    </td>
                    <td>{item.crn}</td>
                    <td>{item.seqnumb}</td>
                    <td>{item.lastName ?? 'Not listed'}</td>
                    <td>
                      <form action={addClass}>
                        <input
                          name="classOfferingId"
                          type="hidden"
                          value={item.id}
                        />
                        <button
                          className="btn btn-sm btn-primary"
                          disabled={alreadySaved}
                          type="submit"
                        >
                          {alreadySaved ? 'Already Added' : 'Add to My Classes'}
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <p>No class sections match those filters.</p>
        ))}
    </section>
  );
};

export default ClassSearchForm;
