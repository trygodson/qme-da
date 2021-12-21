const KEYS = {
  employees: 'employees',
  employeeId: 'employeeId',
};

export const getDepartmentCollection = () => [
  { id: '1', title: 'Development' },
  { id: '2', title: 'Marketing' },
  { id: '3', title: 'Accounting' },
  { id: '4', title: 'HR' },
];

export function insertEmployee(data) {
  let employees = getAllEmployees();
  data['id'] = generateEmployeeId();
  employees.push(data);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function generateEmployeeId() {
  if (localStorage.getItem(KEYS.employeeId) == null) localStorage.setItem(KEYS.employeeId, '0');
  var id = parseInt(localStorage.getItem(KEYS.employeeId));
  localStorage.setItem(KEYS.employeeId, (++id).toString());
  return id;
}

export function getAllEmployees() {
  if (localStorage.getItem(KEYS.employees) == null)
    localStorage.setItem(KEYS.employees, JSON.stringify([]));
  let employees = JSON.parse(localStorage.getItem(KEYS.employees));
  //map departmentID to department title
  let departments = getDepartmentCollection();
  return employees.map(x => ({
    ...x,
    department: departments[x.departmentId - 1].title,
  }));
}

export const employees = async ({}) => {
  var id = await timeout(5000);
  console.log(id);
  clearTimeout();

  return {
    data: [
      {
        fullName: 'John Doe 1',
        email: 'doe@gmail.com',
        mobile: '1224142412',
        department: 'dpt',
        id: '1sd',
      },
      {
        fullName: 'John Doe 2',
        email: 'doe@gmail.com',
        mobile: '1224142412',
        department: 'dpt',
        id: '1sd',
      },
      {
        fullName: 'John Doe 3',
        email: 'doe@gmail.com',
        mobile: '1224142412',
        department: 'dpt',
        id: '1sd',
      },
      {
        fullName: 'John Doe 4',
        email: 'doe@gmail.com',
        mobile: '1224142412',
        department: 'dpt',
        id: '1sd',
      },
      {
        fullName: 'John Doe 5',
        email: 'doe@gmail.com',
        mobile: '1224142412',
        department: 'dpt',
        id: '1sd',
      },
      // {
      //   fullName: 'John Doe 6',
      //   email: 'doe@gmail.com',
      //   mobile: '1224142412',
      //   department: 'dpt',
      //   id: '1sd',
      // },
      // {
      //   fullName: 'John Doe 7',
      //   email: 'doe@gmail.com',
      //   mobile: '1224142412',
      //   department: 'dpt',
      //   id: '1sd',
      // },
      // {
      //   fullName: 'John Doe 8',
      //   email: 'doe@gmail.com',
      //   mobile: '1224142412',
      //   department: 'dpt',
      //   id: '1sd',
      // },
      // {
      //   fullName: 'John Doe 9',
      //   email: 'doe@gmail.com',
      //   mobile: '1224142412',
      //   department: 'dpt',
      //   id: '1sd',
      // },
      // {
      //   fullName: 'John Doe 10',
      //   email: 'doe@gmail.com',
      //   mobile: '1224142412',
      //   department: 'dpt',
      //   id: '1sd',
      // },
    ],
  };
};

function timeout(delay) {
  return new Promise(res => setTimeout(res, delay));
}
