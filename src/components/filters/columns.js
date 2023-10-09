import { ColumnFilter } from "./ColumnFilter";

export const COLUMNS = [
  {
    Header: "id",
    Footer: "id",
    accessor: "employee_id",
    disableFilters: true,
  },
  {
    Header: "passport",
    Footer: "passport",
    accessor: "employee_passport_number",
  },
  {
    Header: "pesel",
    Footer: "pesel",
    accessor: "employee_pesel",
  },
  {
    Header: "firstName",
    Footer: "firstName",
    accessor: "employee_first_name",
  },
  {
    Header: "lastName",
    Footer: "lastName",
    accessor: "employee_last_name",
  },
  {
    Header: "gender",
    Footer: "gender",
    accessor: "employee_gender",
  },
  {
    Header: "id stanowiska",
    Footer: "id stanowiska",
    accessor: "employee_position_id",
  },
  {
    Header: "stanowisko",
    Footer: "stanowisko",
    accessor: "employee_position",
  },
  {
    Header: "status emp",
    Footer: "status emp",
    accessor: "employee_status",
  },
  {
    Header: "data zakwaterowania",
    Footer: "data zakwaterowania",
    accessor: "employee_accommodation_date",
  },
  {
    Header: "data szkolenia",
    Footer: "data szkolenia",
    accessor: "employee_training_date",
  },
  {
    Header: "data ważności zaświadczenia medycznego",
    Footer: "data ważności zaświadczenia medycznego",
    accessor: "employee_medical_certificate_date",
  },
  {
    Header: "data wjazdu na teren RP",
    Footer: "data wjazdu na teren RP",
    accessor: "employee_entry_to_rp_date",
  },
  {
    Header: "dokument",
    Footer: "dokument",
    accessor: "employee_document_type",
  },
  {
    Header: "dokument legalizacyjny",
    Footer: "dokument legalizacyjny",
    accessor: "employee_legalization_document",
  },
  {
    Header: "ważność dokumentu",
    Footer: "ważność dokumentu",
    accessor: "employee_legalization_document_expiry",
  },
  {
    Header: "data rozpoczęcia umowy",
    Footer: "data rozpoczęcia umowy",
    accessor: "employee_contract_start",
  },
  {
    Header: "data zakończenia umowy",
    Footer: "data zakończenia umowy",
    accessor: "employee_contract_end",
  },
  {
    Header: "telefon",
    Footer: "telefon",
    accessor: "employee_phone",
  },
  {
    Header: "ostatni dzień pracy",
    Footer: "ostatni dzień pracy",
    accessor: "employee_last_working_day",
  },
  {
    Header: "data odejścia",
    Footer: "data odejścia",
    accessor: "employee_departure_date",
  },
  {
    Header: "komentarz",
    Footer: "komentarz",
    accessor: "employee_comments",
  },
  {
    Header: "ważność legitymacji studenckiej ",
    Footer: "ważność legitymacji studenckiej ",
    accessor: "employee_student_card_end",
  },
  {
    Header: "data urodzenia",
    Footer: "data urodzenia",
    accessor: "employee_date_of_birth",
  },
];

export const GROUPED_COLUMNS = [
  { Header: "id", Footer: "id", accessor: "employee_id" },
  {
    Header: "Name",
    Footer: "Name",
    columns: [
      {
        Header: "passport",
        Footer: "passport",
        accessor: "employee_passport_number",
      },
      {
        Header: "pesel",
        Footer: "pesel",
        accessor: "employee_pesel",
      },
      {
        Header: "firstName",
        Footer: "firstName",
        accessor: "employee_first_name",
      },
      {
        Header: "lastName",
        Footer: "lastName",
        accessor: "employee_last_name",
      },
      {
        Header: "gender",
        Footer: "gender",
        accessor: "employee_gender",
      },
    ],
  },
  {
    Header: "Info",
    Footer: "Info",
    columns: [
      {
        Header: "id stanowiska",
        Footer: "id stanowiska",
        accessor: "employee_position_id",
      },
      {
        Header: "stanowisko",
        Footer: "stanowisko",
        accessor: "employee_position",
      },
      {
        Header: "status emp",
        Footer: "status emp",
        accessor: "employee_status",
      },
      {
        Header: "data zakwaterowania",
        Footer: "data zakwaterowania",
        accessor: "employee_accommodation_date",
      },
      {
        Header: "data szkolenia",
        Footer: "data szkolenia",
        accessor: "employee_training_date",
      },
      {
        Header: "data ważności zaświadczenia medycznego",
        Footer: "data ważności zaświadczenia medycznego",
        accessor: "employee_medical_certificate_date",
      },
      {
        Header: "data wjazdu na teren RP",
        Footer: "data wjazdu na teren RP",
        accessor: "employee_entry_to_rp_date",
      },
      {
        Header: "dokument",
        Footer: "dokument",
        accessor: "employee_document_type",
      },
      {
        Header: "dokument legalizacyjny",
        Footer: "dokument legalizacyjny",
        accessor: "employee_legalization_document",
      },
      {
        Header: "ważność dokumentu",
        Footer: "ważność dokumentu",
        accessor: "employee_legalization_document_expiry",
      },
      {
        Header: "data rozpoczęcia umowy",
        Footer: "data rozpoczęcia umowy",
        accessor: "employee_contract_start",
      },
      {
        Header: "data zakończenia umowy",
        Footer: "data zakończenia umowy",
        accessor: "employee_contract_end",
      },
      {
        Header: "telefon",
        Footer: "telefon",
        accessor: "employee_phone",
      },
      {
        Header: "ostatni_dzień_pracy",
        Footer: "ostatni_dzień_pracy",
        accessor: "employee_last_working_day",
      },
      {
        Header: "data odejścia",
        Footer: "data odejścia",
        accessor: "employee_departure_date",
      },
      {
        Header: "komentarz",
        Footer: "komentarz",
        accessor: "employee_comments",
      },
      {
        Header: "ważność legitymacji studenckiej ",
        Footer: "ważność legitymacji studenckiej ",
        accessor: "employee_student_card_end",
      },
      {
        Header: "data urodzenia",
        Footer: "data urodzenia",
        accessor: "employee_date_of_birth",
      },
    ],
  },
];
