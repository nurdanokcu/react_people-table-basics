import cn from 'classnames';
import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[]
  selectedSlug: string
};

export const PeopleTable:React.FC<Props> = ({
  people,
  selectedSlug,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName) || null;
          const father = people.find(p => p.name === person.fatherName) || null;

          return (
            <tr
              className={cn({
                'has-background-warning': selectedSlug === person.slug,
              })}
              key={person.slug}
              data-cy="person"
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td><PersonLink person={mother} /></td>
              <td><PersonLink person={father} /></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
