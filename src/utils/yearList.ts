type Option = {
  option: string;
};

const thisYear = new Date().getFullYear();

const yaerList: Option[] = [];

for (let i = 2015; i <= thisYear; i++) {
  yaerList.push({ option: i.toString() });
}

export default yaerList;
