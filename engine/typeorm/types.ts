export enum ReferencialAction {
  NO_ACTION = "NO ACTION",
  RESTRICT = "RESTRICT",
  CASCADE = "CASCADE",
  SET_NULL = "SET NULL",
  SET_DEFAULT = "SET_DEFAULT",
}

/**
 * Table's column options.
 */
export interface TableColumnOptions {
  /**
   * Column name
   */
  name: string;

  /**
   * Column Type
   */
  type: string;

  /**
   * Column's default value.
   */
  // deno-lint-ignore no-explicit-any
  default?: any;

  /**
   * Indicates if column is NULL, or is NOT NULL in the database.
   */
  isNullable?: boolean;
  /**
   * Indicates if column is auto-generated sequence.
   */
  isGenerated?: boolean;

  /**
   * Specifies generation strategy if this column will use auto increment.
   */
  generationStrategy?: "uuid" | "increment" | "rowid" | "identity";
  /**
   * Indicates if column is a primary key.
   */
  isPrimary?: boolean;
  /**
   * Indicates if column has unique value.
   */
  isUnique?: boolean;
  /**
   * Indicates if column stores array.
   */
  isArray?: boolean;
  /**
   * Column's comment.
   */
  comment?: string;
  /**
   * Column type's length. Used only on some column types.
   * For example type = "string" and length = "100" means that ORM will create a column with type varchar(100).
   */
  length?: string;

  /**
   * Defines column character set.
   */
  charset?: string;
  /**
   * Defines column collation.
   */
  collation?: string;
  /**
   * The precision for a decimal (exact numeric) column (applies only for decimal column), which is the maximum
   * number of digits that are stored for the values.
   */
  precision?: number | null;
  /**
   * The scale for a decimal (exact numeric) column (applies only for decimal column), which represents the number
   * of digits to the right of the decimal point and must not be greater than precision.
   */
  scale?: number;
  /**
   * Puts ZEROFILL attribute on to numeric column. Works only for MySQL.
   * If you specify ZEROFILL for a numeric column, MySQL automatically adds the UNSIGNED attribute to the column
   */
  zerofill?: boolean;
  /**
   * Puts UNSIGNED attribute on to numeric column. Works only for MySQL.
   */
  unsigned?: boolean;
}

/**
 * Foreign key options.
 */
export interface TableForeignKeyOptions {
  /**
   * Name of the foreign key.
   */
  name?: string;
  /**
   * Column names which included by this foreign key.
   */
  columnNames: string[];
  /**
   * Database of the Table referenced in the foreign key.
   */
  referencedDatabase?: string;
  /**
   * Schema of the Table referenced in the foreign key.
   */
  referencedSchema?: string;
  /**
   * Table referenced in the foreign key.
   */
  referencedTableName: string;
  /**
   * Column names which included by this foreign key.
   */
  referencedColumnNames: string[];
  /**
   * "ON DELETE" of this foreign key, e.g. what action database should perform when
   * referenced stuff is being deleted.
   */
  onDelete?: ReferencialAction;
  /**
   * "ON UPDATE" of this foreign key, e.g. what action database should perform when
   * referenced stuff is being updated.
   */
  onUpdate?: ReferencialAction;
  /**
   * Set this foreign key constraint as "DEFERRABLE" e.g. check constraints at start
   * or at the end of a transaction
   */
  deferrable?: string;
}

/**
 * Database's table index options.
 */
export interface TableIndexOptions {
  /**
   * Constraint name.
   */
  name?: string;
  /**
   * Columns included in this index.
   */
  columnNames: string[];
  /**
   * Indicates if this index is unique.
   */
  isUnique?: boolean;
  /**
   * The SPATIAL modifier indexes the entire column and does not allow indexed columns to contain NULL values.
   * Works only in MySQL.
   */
  isSpatial?: boolean;
  /**
   * The FULLTEXT modifier indexes the entire column and does not allow prefixing.
   * Supported only in MySQL & SAP HANA.
   */
  isFulltext?: boolean;
  /**
   * NULL_FILTERED indexes are particularly useful for indexing sparse columns, where most rows contain a NULL value.
   * In these cases, the NULL_FILTERED index can be considerably smaller and more efficient to maintain than
   * a normal index that includes NULL values.
   *
   * Works only in Spanner.
   */
  isNullFiltered?: boolean;
  /**
   * Fulltext parser.
   * Works only in MySQL.
   */
  parser?: string;
  /**
   * Index filter condition.
   */
  where?: string;
}
