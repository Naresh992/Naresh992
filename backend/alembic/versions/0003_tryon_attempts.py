"""tryon retry fields"""
from alembic import op
import sqlalchemy as sa

revision = '0003_tryon_attempts'
down_revision = '0002_full_schema'
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.add_column('tryon_sessions', sa.Column('render_attempts', sa.Integer(), nullable=False, server_default='0'))
    op.add_column('tryon_sessions', sa.Column('error_message', sa.Text(), nullable=True))

def downgrade() -> None:
    op.drop_column('tryon_sessions', 'error_message')
    op.drop_column('tryon_sessions', 'render_attempts')
