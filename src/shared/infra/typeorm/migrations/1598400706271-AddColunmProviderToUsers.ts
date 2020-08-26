import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColunmProviderToUsers1598400706271
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'provider',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'provider');
  }
}
