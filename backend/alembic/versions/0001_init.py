"""init schema"""
from alembic import op
import sqlalchemy as sa

revision = '0001_init'
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.create_table('users', sa.Column('id', sa.Integer, primary_key=True), sa.Column('email', sa.String(255), nullable=False), sa.Column('password_hash', sa.String(255), nullable=False), sa.Column('role', sa.String(32), nullable=False), sa.Column('is_verified', sa.Boolean, nullable=False, server_default=sa.text('false')), sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()), sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now()), sa.Column('deleted_at', sa.DateTime(timezone=True)))
    op.create_index('ix_users_email', 'users', ['email'], unique=True)

def downgrade() -> None:
    op.drop_index('ix_users_email', table_name='users')
    op.drop_table('users')
